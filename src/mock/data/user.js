import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
      userName: Mock.Random.cname(),
      realName: Mock.Random.cname(),
      createTime: Mock.Random.date(),
      mobile: /^1[385][1-9]\d{8}/,
  }));
}

export { LoginUsers, Users };
