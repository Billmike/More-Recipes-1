export default {
  postReviewSuccess: {
    id: 2,
    content: 'Nice recipe',
    createdAt: '25-05-2005',
    User: {
      fullName: 'James John',
      firstName: 'James',
      lastName: 'John',
      userImage: 'User image',
    },
  },
  postReviewSuccessResponse: {
    status: 'Success',
    message: 'Review created',
    data: {
      review: {
        id: 2,
        content: 'Nice recipe',
        createdAt: '25-05-2005',
        User: {
          fullName: 'James John',
          firstName: 'James',
          lastName: 'John',
          userImage: 'User image',
        },
      },
    },
  },
};
