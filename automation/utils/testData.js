function uniqueUser(email) {
  const stamp = Date.now();

  return {
    firstName: 'Test',
    lastName: 'Agent',
    email: email,
    phone: '98' + String(stamp).slice(-8),
    password: 'Test@1234',
  };
}

function agencyDetails() {
  const stamp = Date.now();

  return {
    name: 'Bright Future Education Consultancy',
    role: 'Director',
    email: `info.${stamp}@example.com`,
    website: 'www.google.com',
    address: 'Putalisadak, Kathmandu',
    regions: ['Nepal', 'New Zealand'],
  };
}

function experienceDetails() {
  return {
    level: '1 year',
    students: 150,
    focusArea: 'Undergraduate admissions to Canada',
    successMetrics: 90,
    services: ['Career Counseling', 'Visa Processing'],
  };
}

function businessDetails() {
  const stamp = Date.now();

  return {
    registrationNumber: `REG-${stamp}`,
    countries: ['Australia'],
    institutionTypes: ['Universities'],
    certification: 'ICEF Certified Education Agent',
    documentPath: 'test-data/registration-document.pdf',
  };
}

module.exports = {
  uniqueUser,
  agencyDetails,
  experienceDetails,
  businessDetails,
};