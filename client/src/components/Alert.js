import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Alert} from 'react-bootstrap'

import { Context } from '..';

const AlertBlock = observer ( () => {

    const {alert} = useContext(Context)

    if (alert.visible) {
        return (
          <Alert variant={alert.type || "warning"} onClose={() => alert.setVisible(false)} dismissible>
            <Alert.Heading>{alert.text}</Alert.Heading>
          </Alert>
        );
      }
      return <></>
});

export default AlertBlock;