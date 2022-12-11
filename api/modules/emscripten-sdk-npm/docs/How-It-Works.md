## How it works

With the `emsdk-checkout` command, emsdk is checked out via git into the module's subdirectory. The `emsdk` command is then callable, which allows installing and configuring a specific emscripten binary distribution.

The various tools like `emcc` and `em++` are then available through the `emsdk-run` command (they will not work until the '`activate`' step is done).

Note that emsdk's binary releases may not be available for all platforms, and sometimes release at different times.

Note that emsdk is used in "embedded" mode where it does not alter the user's global `~/.emscripten`, so different projects may install and use different versions of emscripten.
