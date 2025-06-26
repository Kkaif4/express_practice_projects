const posts = [
  {
    id: 1,
    username: 'john_doe',
    avatar: '/images/users/john.jpg',
    image: '/images/posts/post1.jpg',
    caption: 'Enjoying the sunset! 🌅',
    likes: 120,
    comments: [
      { user: 'jane_smith', comment: 'Wow! Beautiful view 😍' },
      { user: 'alex99', comment: 'Where is this?' },
    ],
    createdAt: '2025-06-25T14:32:00Z',
  },
  {
    id: 2,
    username: 'lufy',
    avatar: '/images/users/lufy.jpg',
    image: '/images/posts/post2.jpg',
    caption: 'Gear 5 unlocked ⚡',
    likes: 230,
    comments: [
      { user: 'zoro', comment: 'Captain 😤🔥' },
      { user: 'nami', comment: 'Take me next time!' },
    ],
    createdAt: '2025-06-26T09:45:00Z',
  },
  {
    id: 3,
    username: 'shanks',
    avatar: '/images/users/shanks.jpg',
    image: '/images/posts/post3.jpg',
    caption: 'Some battles are worth the scar.',
    likes: 315,
    comments: [
      { user: 'buggy', comment: 'Still salty 🤡' },
      { user: 'ace', comment: 'Legends never die 🔥' },
    ],
    createdAt: '2025-06-27T07:15:00Z',
  },
];

export default posts;
