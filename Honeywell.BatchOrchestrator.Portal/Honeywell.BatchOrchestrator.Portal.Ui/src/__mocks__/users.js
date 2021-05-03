const mockDateString = '04/06/2020';
export const userListArray = [
  {
    fullName: 'Alex',
    username: 'Alex',
    email: 'Alex@gmail.com',
    phone: '1234567890',
    dateTimeCreated: mockDateString,
    lastSignIn: mockDateString,
    lastSignInStatus: true,
    role: 'Admin',
    status: 'Disable',
  },
  {
    fullName: 'John',
    username: 'John',
    email: 'john@gmail.com',
    phone: '1234567890',
    dateTimeCreated: mockDateString,
    lastSignIn: '05/06/2020',
    lastSignInStatus: false,
    role: 'Admin',
    status: 'Enable',
  },
  {
    fullName: 'Mark',
    username: 'Mark',
    email: 'mark@gmail.com',
    phone: '1234567890',
    dateTimeCreated: '07/06/2020',
    lastSignIn: '08/06/2020',
    lastSignInStatus: true,
    role: 'Admin',
    status: 'Enable',
  },
];

export const roleList = [
  { value: 'Select', label: 'Select' },
  { value: 'admin', label: 'Admin' },
  { value: 'se', label: 'SE' },
];

export const countryCodeList = [
  { value: 'Select', label: 'Select' },
  { value: 'IND', label: '+91' },
  { value: 'US', label: '034' },
];

export const userObj = [
  {
    firstaName: 'John',
    middleName: 'Select',
    lastName: 'Ben',
    userName: 'John-Ben',
    email: 'John@hotmail.com',
    telephone: '24243423',
    role: { value: 'admin', label: 'Admin' },
    countryCode: { value: 'IND', label: '+91' },
  },
];
