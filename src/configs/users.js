export const USERS = [
  {
    'id': 0,
    'name': 'Evelyn',
    'email': 'evsong@stanford.edu',
    'status': 'online',
    'description': 'I am a student at Stanford University',
    'profile_pic': 'https://i.pravatar.cc/300'
  }, {
    'id': 1,
    'name': 'j',
    'email': 'j',
    'status': 'online',
    'description': 'I am a student at Stanford University',
    'profile_pic': 'https://i.pravatar.cc/400'
  }, {
    'id': 2,
    'name': 'j2',
    'email': 'j2',
    'status': 'offline',
    'description': 'I am a student at Stanford University',
    'profile_pic': 'https://i.pravatar.cc/500'
  }
]

export const getUser = (id) => {
  return USERS[id];
}