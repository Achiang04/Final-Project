import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Accordion, Block} from 'galio-framework';

const AccordionList = () => {
  const test = [{title: '1', tesss: `qwe`}];

  const data = [{title: `qw`, content: test.tesss}];

  return (
    <View style={styles.container}>
      <Block style={styles.block}>
        <Accordion dataArray={data} opened={null} onAccordionOpen={null} />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccordionList;
