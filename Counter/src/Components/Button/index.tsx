import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity``; // 터치하는 순간 버튼이 투명해지는 효과
const Icon = Styled.Image``;

interface Props {
  iconName: 'plus' | 'minus';
  onPress?: () => void;
}

const Button = ({ iconName, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <Icon source={
        iconName === 'plus' ? require('~/Assets/Images/add.png') : require('~/Assets/Images/remove.png')}
        />
    </Container>
  );
};

export default Button;
// export default는 파일 전체를 내보내기
// import 할 경우 이름을 마음대로 정하는 것이 가능

// export는 해당 변수만 내보내기
// import 할 경우 해당 변수명을 그대로 가져와야 한다
// import { 해당 변수명 } from '../../'