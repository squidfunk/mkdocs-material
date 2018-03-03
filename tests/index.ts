/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * All rights reserved. No part of this computer program(s) may be used,
 * reproduced, stored in any retrieval system, or transmitted, in any form or
 * by any means, electronic, mechanical, photocopying, recording, or otherwise
 * without prior written permission.
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Entrypoint
 * ------------------------------------------------------------------------- */

/* Load and execute tests */
const tests = require.context("./", true, /\.spec\.ts$/)
tests.keys()
  .forEach(tests)
