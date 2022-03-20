import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {
  email: string;
}

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
const DependantQueriesPage = ({ email }: Props) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;
  const { data } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );

  return (
    <div>
      {data?.data.id}{' '}
      {data?.data.courses.map((el: string) => (
        <p>{el}</p>
      ))}
    </div>
  );
};

export default DependantQueriesPage;
