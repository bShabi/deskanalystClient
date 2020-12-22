import React from 'react';
import CreateMatch from './CreateMatch'

export const About = () => {
  const myTeam = "Hapoel KIRYAT ONO"
  return (
    <div>
      <CreateMatch myTeam={myTeam}/>
    </div>
  );
};
export default About;
