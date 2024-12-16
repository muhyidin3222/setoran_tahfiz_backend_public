export const jwtConstants = {
  secret: 'as23slsd92',
  key_third_party: '09db431d-0807-4d87-833c-76d7744ab9f4',
};

export const dataConstants = {
  master_admin: 'master_admin',
  admin: 'admin',
  user: 'user',
  ustadz: 'ustadz',
};

export const roleUser = {
  master_admin: [],
  admin: [
    {
      name: 'berita',
      path: ['get', 'create', 'update', '/delete/:id', '/detail/:id'],
    },
    {
      name: 'berita',
      path: ['get', 'create', 'update', '/delete/:id', '/detail/:id'],
    },
  ],
  user: 'user',
  ustadz: 'ustadz',
};
