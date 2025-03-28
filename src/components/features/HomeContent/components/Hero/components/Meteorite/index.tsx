import { MeteoriteItem } from '../MetioriteItem';
import { aixbtStyles, anonStyles, Background, buzzStyles, neurStyles, virtualStyles, Wrapper } from './styles';

export const Meteorite = () => {
  return (
    <Wrapper>
      <Background>
        <MeteoriteItem label='virtual' styles={virtualStyles} />
        <MeteoriteItem label='anon' styles={anonStyles} initialIndex={3} />
        <MeteoriteItem label='aixbt' styles={aixbtStyles} initialIndex={2} />
        <MeteoriteItem label='buzz' styles={buzzStyles} initialIndex={4} />
        <MeteoriteItem label='neur' styles={neurStyles} initialIndex={5} />
      </Background>
    </Wrapper>
  );
};
