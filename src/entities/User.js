// Mock user storage for demo purposes
let currentUser = null;
let users = [
  {
    id: 1,
    full_name: "Demo User",
    email: "demo@incois.gov.in",
    password: "demo123",
    role_type: "citizen",
    verification_status: "verified",
    phone: "+91-40-23895000",
    location: "Hyderabad, India",
    bio: "Dedicated to ocean safety and disaster management",
    emergency_contact: "+91-9876543210",
    organization: "INCOIS",
    joined_date: "2024-01-15"
  }
];

export const User = {
  async me() { 
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    return currentUser;
  },

  async login(email, password) {
    // Simulate login process with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Set current user (in real app, this would be handled by tokens/session)
    currentUser = { ...user };
    delete currentUser.password; // Remove password from user object
    
    console.log("User logged in:", currentUser);
    return currentUser;
  },

  async signup(userData) {
    // Simulate signup process with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      organization: userData.organization || "INCOIS",
      role_type: userData.role_type,
      verification_status: "pending",
      location: "India",
      bio: `New ${userData.role_type} user`,
      emergency_contact: userData.phone,
      joined_date: new Date().toISOString().split('T')[0]
    };
    
    // Add to users array
    users.push(newUser);
    
    console.log("User signed up:", newUser);
    return { message: "Account created successfully" };
  },

  async logout() {
    // Simulate logout process
    console.log("User logged out");
    currentUser = null;
  },

  async updateMyUserData(userData) {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    
    // Simulate updating user data
    console.log("Updating user data:", userData);
    
    // Update current user
    currentUser = { ...currentUser, ...userData };
    
    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
    }
    
    return Promise.resolve(currentUser);
  },

  // Helper method to check if user is authenticated
  isAuthenticated() {
    return currentUser !== null;
  },

  // Helper method to get current user without throwing error
  getCurrentUser() {
    return currentUser;
  }
};