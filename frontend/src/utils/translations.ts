export const translations = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    myProducts: 'My Products',
    orders: 'Orders',
    support: 'Support',
    login: 'Login',
    signUp: 'Sign Up',
    logout: 'Logout',
    editProfile: 'Edit Profile',
    myOrders: 'My Orders',
    wishlist: 'Wishlist',
    
    // Support Dialog
    sendMessage: 'Send us a Message',
    yourName: 'Your Name',
    enterName: 'Enter your name',
    mobileNumber: 'Mobile Number',
    enterMobile: 'Enter 10-digit mobile number',
    message: 'Message',
    howCanWeHelp: 'How can we help you?',
    sendMessageBtn: 'Send Message',
    
    // HomePage - Shop Owner
    myProductsSection: 'My Products',
    viewAll: 'View All',
    addFirstProduct: 'Add Your First Product',
    noProducts: 'You haven\'t added any products yet',
    edit: 'Edit',
    pendingOrdersSection: 'Pending Orders',
    viewAllOrders: 'View All Orders',
    noPendingOrders: 'No pending orders',
    orderID: 'Order ID',
    customer: 'Customer',
    items: 'items',
    total: 'Total',
    viewDetails: 'View Details',
    
    // Status badges
    pending: 'Pending',
    accepted: 'Accepted',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    
    // Login Page
    farmer: 'Farmer',
    shopOwner: 'Shop Owner',
    password: 'Password',
    enterPassword: 'Enter password',
    loginAsFarmer: 'Login as Farmer',
    loginAsShopOwner: 'Login as Shop Owner',
    loggingIn: 'Logging in...',
    dontHaveAccount: 'Don\'t have an account?',
    demoAdminLogin: 'Demo Admin Login',
    selectLanguage: 'Select Language',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  hi: {
    // Navbar
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    dashboard: 'डैशबोर्ड',
    myProducts: 'मेरे उत्पाद',
    orders: 'ऑर्डर',
    support: 'सहायता',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    logout: 'लॉगआउट',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    myOrders: 'मेरे ऑर्डर',
    wishlist: 'विशलिस्ट',
    
    // Support Dialog
    sendMessage: 'हमें संदेश भेजें',
    yourName: 'आपका नाम',
    enterName: 'अपना नाम दर्ज करें',
    mobileNumber: 'मोबाइल नंबर',
    enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
    message: 'संदेश',
    howCanWeHelp: 'हम आपकी कैसे मदद कर सकते हैं?',
    sendMessageBtn: 'संदेश भेजें',
    
    // HomePage - Shop Owner
    myProductsSection: 'मेरे उत्पाद',
    viewAll: 'सभी देखें',
    addFirstProduct: 'अपना पहला उत्पाद जोड़ें',
    noProducts: 'आपने अभी तक कोई उत्पाद नहीं जोड़ा है',
    edit: 'संपादित करें',
    pendingOrdersSection: 'लंबित ऑर्डर',
    viewAllOrders: 'सभी ऑर्डर देखें',
    noPendingOrders: 'कोई लंबित ऑर्डर नहीं',
    orderID: 'ऑर्डर आईडी',
    customer: 'ग्राहक',
    items: 'आइटम',
    total: 'कुल',
    viewDetails: 'विवरण देखें',
    
    // Status badges
    pending: 'लंबित',
    accepted: 'स्वीकृत',
    delivered: 'वितरित',
    cancelled: 'रद्द',
    
    // Login Page
    farmer: 'किसान',
    shopOwner: 'दुकान मालिक',
    password: 'पासवर्ड',
    enterPassword: 'पासवर्ड दर्ज करें',
    loginAsFarmer: 'किसान के रूप में लॉगिन करें',
    loginAsShopOwner: 'दुकान मालिक के रूप में लॉगिन करें',
    loggingIn: 'लॉगिन हो रहा है...',
    dontHaveAccount: 'खाता नहीं है?',
    demoAdminLogin: 'डेमो एडमिन लॉगिन',
    selectLanguage: 'भाषा चुनें',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
  }
};

export type TranslationKey = keyof typeof translations.en;
