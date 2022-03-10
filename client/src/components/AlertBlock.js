import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Alert, Container} from 'react-bootstrap'
import {CSSTransition} from 'react-transition-group'

import { Context } from '..';

const AlertBlock = observer ( () => {

    const {alert} = useContext(Context)

    // if (alert.alertVisible) {
        return (
          <CSSTransition
            in={alert.alertVisible}
            timeout={{
              enter: 750,
              exit: 500
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
          >
            <Container>
              <Alert variant={alert.type || "warning"} onClose={() => alert.hideAlert(false)} dismissible>
                <Alert.Heading>{alert.text}</Alert.Heading>
              </Alert>
            </Container>
          </CSSTransition>
        );
      // return <></>
});

export default AlertBlock;