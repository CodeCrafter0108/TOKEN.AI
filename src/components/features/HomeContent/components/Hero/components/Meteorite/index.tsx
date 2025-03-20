
import { MeteoriteItem } from '../MetioriteItem';
import { aixbtStyles, anonStyles, Background, buzzStyles, neurStyles, virtualStyles, Wrapper } from './styles';

export const Meteorite = () => {
  return (
    <Wrapper>
      <Background>
        <MeteoriteItem label='virtual' styles={virtualStyles} interval={2000}/>
        <MeteoriteItem label='anon' styles={anonStyles} interval={1500} duration={0.8} initialIndex={3}/>
        <MeteoriteItem label='aixbt' styles={aixbtStyles} interval={2500} duration={1.2} initialIndex={2}/>
        <MeteoriteItem label='buzz' styles={buzzStyles} interval={1700} duration={0.9} initialIndex={4}/>
        <MeteoriteItem label='neur' styles={neurStyles} interval={1700} duration={0.9} initialIndex={5}/>
      </Background>
    </Wrapper>
  );
};
