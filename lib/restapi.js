//用户数据示例
let users = [
    {
        "uuid": "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "admin",
        "password": "123456",
        "avatar": '/static/images/Avatar-1.png'
    },
    {
        "uuid": "3bb179af-bcc5-4fe0-9dac-c05688484649",
        "name": "Wallace",
        "password": "123",
        "avatar": '/static/images/Avatar-2.png'
    },
    {
        "uuid": "fdee46b0-4b01-4590-bdba-6586d7617f95",
        "name": "Tracy",
        "password": "123",
        "avatar": '/static/images/Avatar-3.png'
    },
    {
        "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "Juanita",
        "password": "123",
        "avatar": '/static/images/Avatar-4.png'
    }
];

//群数据示例
let groups = [
    {
        "uuid": "group-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "狼小宝和猪小宝",
        "avatar" : '../../../static/images/we/2.jpg',
        "userList": [34,68,71,72,79,91,92]
    },
];


function RestApi() {

}

function User(uuid, name, avatar) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
}

function Group(uuid, name, avatar) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
}

RestApi.prototype.findFriends = function (user) {
    let friendList = users.filter(v => v.uuid !== user.uuid);
    return friendList;
}

RestApi.prototype.findGroups = function (user) {
    return groups;
}

RestApi.prototype.findUser = function (username, password) {
    let user = users.find(user => (user.name === username && user.password === password));
    if(user) {
        return new User(user.uuid, user.name, user.avatar);
    }
    return user;
}

RestApi.prototype.findGroupById = function (groupId) {
    let group = groups.find(group => (group.uuid === groupId));
    return new Group(group.uuid, group.name, group.avatar);
};

RestApi.prototype.findUserById = function (userId) {
    let user = users.find(user => (user.uuid === userId));
    return new User(user.uuid, user.name, user.avatar);
};

RestApi.prototype.findGroupMembers = function (groupId) {
    let members = {};
    let group = groups.find(v => v.uuid === groupId);
    users.map(user => {
        let groupUserUuid = group.userList.find((uuid)=>{
            return uuid === user.uuid;
        });
        if (groupUserUuid) {
            members[groupUserUuid] = new User(user.uuid, user.name, user.avatar);
        }
    });
    return members;
}

export default new RestApi();
