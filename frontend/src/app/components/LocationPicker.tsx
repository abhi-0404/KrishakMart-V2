import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, X, Search, Check, Loader2, Target } from 'lucide-react';
import { toast } from 'sonner';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface LocationPickerProps {
  value?: LocationData;
  onChange: (loc: LocationData) => void;
  label?: string;
  placeholder?: string;
}

interface GeoResult {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const reverseGeocode = async (lat: number, lon: number): Promise<GeoResult> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const d = await res.json();
    if (!d.display_name) return { address: `${lat.toFixed(5)}, ${lon.toFixed(5)}`, city: '', state: '', pincode: '' };

    const a = d.address || {};
    // City: try multiple Nominatim fields in priority order
    const city = a.city || a.town || a.village || a.county || a.district || a.suburb || '';
    // State: Nominatim returns "state" for Indian states
    const state = a.state || '';
    // Pincode
    const pincode = a.postcode || '';
    // Short display address: first 4 meaningful parts
    const parts = d.display_name.split(', ');
    const address = parts.slice(0, 4).join(', ');

    return { address, city, state, pincode };
  } catch {
    return { address: `${lat.toFixed(5)}, ${lon.toFixed(5)}`, city: '', state: '', pincode: '' };
  }
};

const searchPlaces = async (q: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&countrycodes=in`,
    { headers: { 'Accept-Language': 'en' } }
  );
  return res.json() as Promise<Array<{ lat: string; lon: string; display_name: string }>>;
};

// ── Smart Location Modal ─────────────────────────────────────────────────────
const LocationModal: React.FC<{
  initial?: LocationData;
  onConfirm: (loc: LocationData) => void;
  onClose: () => void;
}> = ({ initial, onConfirm, onClose }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const [geoResult, setGeoResult] = useState<GeoResult | null>(
    initial?.address ? { address: initial.address, city: initial.city || '', state: initial.state || '', pincode: initial.pincode || '' } : null
  );
  const address = geoResult?.address || '';
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    initial?.latitude ? { lat: initial.latitude, lon: initial.longitude } : null
  );
  const [loadingAddr, setLoadingAddr] = useState(false);
  const [gettingGPS, setGettingGPS] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reverse geocode on map move (debounced 600ms)
  const onMapMoveEnd = useCallback(async (map: any) => {
    const center = map.getCenter();
    const lat = center.lat;
    const lon = center.lng;
    setCoords({ lat, lon });
    setLoadingAddr(true);
    if (moveTimer.current) clearTimeout(moveTimer.current);
    moveTimer.current = setTimeout(async () => {
      const result = await reverseGeocode(lat, lon);
      setGeoResult(result);
      setLoadingAddr(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || leafletMap.current) return;

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const startLat = initial?.latitude || 20.5937;
      const startLon = initial?.longitude || 78.9629;
      const zoom = initial?.latitude ? 15 : 5;

      const map = L.map(mapContainerRef.current!, {
        zoomControl: false,
        attributionControl: false,
      }).setView([startLat, startLon], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Zoom control bottom-left
      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      // Attribution bottom-right minimal
      L.control.attribution({ position: 'bottomright', prefix: '© OSM' }).addTo(map);

      map.on('moveend', () => onMapMoveEnd(map));

      leafletMap.current = map;
      setMapReady(true);

      // Initial reverse geocode if no address yet
      if (!initial?.address && initial?.latitude) {
        onMapMoveEnd(map);
      }
    });

    return () => {
      if (moveTimer.current) clearTimeout(moveTimer.current);
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  const flyTo = (lat: number, lon: number, zoom = 16) => {
    if (leafletMap.current) {
      leafletMap.current.flyTo([lat, lon], zoom, { duration: 1 });
    }
    setCoords({ lat, lon });
  };

  const handleGPS = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return; }
    setGettingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        flyTo(lat, lon, 17);
        setLoadingAddr(true);
        const result = await reverseGeocode(lat, lon);
        setGeoResult(result);
        setCoords({ lat, lon });
        setLoadingAddr(false);
        setGettingGPS(false);
        toast.success('Location found!');
      },
      (err) => {
        setGettingGPS(false);
        if (err.code === 1) toast.error('Location permission denied. Please allow access.');
        else toast.error('Could not get location. Try searching instead.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const results = await searchPlaces(searchQuery);
      setSearchResults(results);
    } catch { toast.error('Search failed'); }
    finally { setSearching(false); }
  };

  const handleSelectResult = (r: any) => {
    setSearchResults([]);
    setSearchQuery('');
    flyTo(parseFloat(r.lat), parseFloat(r.lon), 16);
  };

  const handleConfirm = () => {
    if (!coords) { toast.error('Please select a location on the map'); return; }
    onConfirm({
      latitude: coords.lat,
      longitude: coords.lon,
      address: geoResult?.address || '',
      city: geoResult?.city || '',
      state: geoResult?.state || '',
      pincode: geoResult?.pincode || '',
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl flex flex-col overflow-hidden shadow-2xl"
        style={{ height: '92vh', maxHeight: '680px' }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32]/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-[#2E7D32]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base leading-none">Select Shop Location</h3>
              <p className="text-xs text-gray-400 mt-0.5">Move the map to pin your exact location</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Search bar ── */}
        <div className="px-4 pt-3 pb-2 flex-shrink-0 relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search your area, market, village..."
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2E7D32] bg-white"
              />
            </div>
            <button onClick={handleSearch} disabled={searching}
              className="bg-[#2E7D32] hover:bg-green-800 text-white px-4 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center gap-1.5 flex-shrink-0">
              {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden max-h-52 overflow-y-auto">
              {searchResults.map((r, i) => (
                <button key={i} onClick={() => handleSelectResult(r)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-[#2E7D32] border-b border-gray-50 last:border-0 transition-colors flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{r.display_name}</span>
                </button>
              ))}
              <button onClick={() => setSearchResults([])}
                className="w-full text-center py-2 text-xs text-gray-400 hover:bg-gray-50 transition-colors">
                Close results
              </button>
            </div>
          )}
        </div>

        {/* ── Map area (flex-1) ── */}
        <div className="relative flex-1 min-h-0">
          {/* Map container */}
          <div ref={mapContainerRef} className="absolute inset-0" style={{ zIndex: 1 }} />

          {/* Fixed center crosshair pin */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
            <div className="flex flex-col items-center -mt-6">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] border-4 border-white shadow-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="w-0.5 h-4 bg-[#2E7D32] opacity-70" />
              <div className="w-2 h-2 rounded-full bg-[#2E7D32] opacity-50" />
            </div>
          </div>

          {/* GPS float button — bottom right of map */}
          <button
            onClick={handleGPS}
            disabled={gettingGPS}
            style={{ zIndex: 10 }}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border-2 border-[#2E7D32] text-[#2E7D32] font-bold text-sm px-4 py-3 rounded-2xl shadow-lg hover:bg-green-50 active:scale-95 transition-all disabled:opacity-60"
          >
            {gettingGPS
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Navigation className="h-4 w-4" />}
            {gettingGPS ? 'Locating...' : 'Use My Location'}
          </button>

          {/* Map loading skeleton */}
          {!mapReady && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center" style={{ zIndex: 5 }}>
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32] mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Address preview strip ── */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0 min-h-[60px] flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            coords ? 'bg-[#2E7D32]/10' : 'bg-gray-200'
          }`}>
            {loadingAddr
              ? <Loader2 className="h-4 w-4 animate-spin text-[#2E7D32]" />
              : coords
                ? <MapPin className="h-4 w-4 text-[#2E7D32]" />
                : <MapPin className="h-4 w-4 text-gray-400" />}
          </div>
          <div className="flex-1 min-w-0">
            {loadingAddr ? (
              <div className="space-y-1.5">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            ) : coords ? (
              <>
                <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{address || 'Getting address...'}</p>
                {(geoResult?.city || geoResult?.state || geoResult?.pincode) && (
                  <p className="text-[10px] text-[#2E7D32] font-medium mt-0.5">
                    {[geoResult.city, geoResult.state, geoResult.pincode].filter(Boolean).join(' · ')}
                  </p>
                )}
                <p className="text-[10px] text-gray-400 mt-0.5">{coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">Move the map to select your location</p>
            )}
          </div>
        </div>

        {/* ── Confirm button ── */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleConfirm}
            disabled={!coords || loadingAddr}
            className="w-full flex items-center justify-center gap-2.5 bg-[#FF9800] hover:bg-orange-500 active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
          >
            <Check className="h-5 w-5" />
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Address Trigger Field (the inline component used in forms) ────────────────
export const LocationPicker: React.FC<LocationPickerProps> = ({
  value,
  onChange,
  label = 'Location',
  placeholder = 'Tap to select location on map...',
}) => {
  const [showModal, setShowModal] = useState(false);
  const hasLocation = !!(value?.latitude && value.latitude !== 0);

  const handleConfirm = (loc: LocationData) => {
    onChange(loc);
    setShowModal(false);
    toast.success('Location confirmed!');
  };

  return (
    <>
      <div>
        {label && (
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            {label}
          </label>
        )}

        {/* Trigger field */}
        {hasLocation ? (
          /* ── Location set: show address row with change button ── */
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#2E7D32] bg-green-50/40">
            <div className="w-7 h-7 rounded-lg bg-[#2E7D32] flex items-center justify-center flex-shrink-0">
              <MapPin className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="flex-1 text-sm font-medium text-gray-800 truncate min-w-0">{value!.address}</p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 text-xs text-[#2E7D32] font-semibold bg-green-100 hover:bg-green-200 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap"
            >
              Change
            </button>
          </div>
        ) : (
          /* ── No location: full-width map button ── */
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border-2 border-dashed border-[#2E7D32]/40 bg-green-50/50 hover:bg-green-50 hover:border-[#2E7D32]/70 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#2E7D32]/10 group-hover:bg-[#2E7D32]/20 flex items-center justify-center transition-colors flex-shrink-0">
              <MapPin className="h-4 w-4 text-[#2E7D32]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#2E7D32]">Open Map & Pin Location</p>
              <p className="text-xs text-gray-400">{placeholder}</p>
            </div>
          </button>
        )}
      </div>

      {showModal && (
        <LocationModal
          initial={hasLocation ? value : undefined}
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
