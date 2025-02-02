// createAdmin.js
require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/User');

// Define your admin credentials here.
const adminCredentials = {
  username: 'admin',       // Change to your desired admin username
  password: 'pkp' // Change to your desired admin password
};

const createAdmin = async () => {
  try {
    // Check if an admin with the same username already exists
    const existingAdmin = await User.findOne({ where: { username: adminCredentials.username } });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.username);
      process.exit(0);
    }

    // This will trigger the beforeCreate hook in your User model to hash the password.
    const newAdmin = await User.create(adminCredentials);
    console.log('Admin user created successfully:', newAdmin.username);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Ensure the database is synced before creating the admin.
sequelize.sync().then(createAdmin);
