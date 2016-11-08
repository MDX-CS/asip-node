/**
 * Node.js library for the asip Arduino protocol
 *
 * @package asip-node
 * @author Pavel Koch <kouks.koch@gmail.com>
 */

import DotEnv from 'dotenv';

import Asip from './Foundation/Asip';

/*
 |-----------------------------------------------------------------------
 | Register global configuration
 |-----------------------------------------------------------------------
 |
 | Load the .env file.
 |
 */

DotEnv.config();

/*
 |-----------------------------------------------------------------------
 | Load the Library
 |-----------------------------------------------------------------------
 |
 | Provide the Asip facade to the user.
 |
 */

export default Asip;

//
// Test area.
//
import Listener from './Events/Listener';

class TestListener extends Listener {
  open(api) {
    //
  }

  loop(api, raw) {
    //
  }

  catch(api, error) {
    //
  }

  close(api) {
    //
  }
}

// Testing purposes
// Fluent variant
Asip.listen(new TestListener);

Asip.close();
