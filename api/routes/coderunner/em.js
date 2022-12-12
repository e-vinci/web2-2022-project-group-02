/* eslint-disable no-console */
// const { execSync } = require('node:child_process');

const emsdk = require('emscripten-sdk-npm');

class EM {
  constructor() {
    // Possible values: 'sdk', 'emception'
    this.EMType = 'sdk';

    // Windows causes problems with emsdk, so we use emception instead
    // if (process.platform === 'win32') {
    //   console.info('EM: Windows detected, using emception instead of emsdk');
    //   this.EMType = 'emception';
    // } else {
    //   // Check if Python 3 is installed
    //   const pythonVersion = execSync('python --version', { encoding: 'ascii' });
    //   if (!pythonVersion.startsWith('Python 3')) {
    //     console.info('EM: Python 3 not found, using emception instead of emsdk');
    //     this.EMType = 'emception';
    //   }
    // }

    // if (process.env.NODE_ENV === 'production' && this.EMType === 'emception')
    //   console.warn(
    //     'EM: Emception is not recommended for production use! Something is wrong with the configuration.',
    //   );

    this.ready =
      this.EMType === 'sdk'
        ? EM.configureEmsdk().catch(() => {
            console.log('EM: Failed to configure emsdk');

            return false;
            // console.error('EM: Failed to configure emsdk, falling back to emception', e);
            // this.EMType = 'emception';
            // return EM.configureEmception();
          })
        : EM.configureEmception();
  }

  static configureEmsdk() {
    return emsdk
      .checkout()
      .then(() => emsdk.install('3.1.28'))
      .then(() => emsdk.activate('3.1.28'))
      .then(() => true);
  }

  static configureEmception() {
    return false;
  }

  run(cmd, args, options) {
    if (this.EMType === 'sdk') {
      return emsdk.run(cmd, args, options);
    }

    return Promise.reject(new Error('EM: Not implemented'));
  }
}

const em = new EM();
module.exports = em;
