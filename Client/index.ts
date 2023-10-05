register(user: any) {
    const data: User = {
      id: Math.floor(Math.random() * 100000000000000000),
      fullName: '',
      birthday: '',
      avatar:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4da7488-f077-4995-8bba-db65531de878/d9rpgq9-37d54773-6e51-4714-86a3-d1d9e63c0895.png/v1/fill/w_200,h_200,q_80,strp/_we_bare_bears_ice_bear_by_francisglenndt_d9rpgq9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAwIiwicGF0aCI6IlwvZlwvYTRkYTc0ODgtZjA3Ny00OTk1LThiYmEtZGI2NTUzMWRlODc4XC9kOXJwZ3E5LTM3ZDU0NzczLTZlNTEtNDcxNC04NmEzLWQxZDllNjNjMDg5NS5wbmciLCJ3aWR0aCI6Ijw9MjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.tbZ-9kmcqR5UO5rkkIYNkLsBel4_QBn4P0SgmGkGzJM',
      bio: '',
      email: '',
      hometown: '',
      live: '',
      relationship: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      secondarySchool: '',
      highSchool: '',
      college: '',
      university: '',
      work: {
        company: '',
        position: '',
      },
      posts: [],
      albums: [],
      friends: [],
      requests: [],
      account: {
        username: user.username,
        password: user.password,
        permission: '_sa-user',
        token: String(Math.floor(Math.random() * 10) + new Date().getTime()),
      },
      verify: false,
    };

    if (user.username === '' || user.password === '') {
      return;
    } else {
      this.users = [...this.users, data];
      const token = btoa(data.account.token + this.secretKey);
      localStorage.setItem('_sa', token);
    }
  }