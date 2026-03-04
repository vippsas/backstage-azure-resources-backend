/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export { azureResourcesPlugin as default } from './plugin';

/**
 * @deprecated Migrate to the new Backstage backend system.
 * Use the default export plugin instead: `backend.add(import('@vippsno/plugin-azure-resources-backend'))`
 * @public
 */
export { createRouter } from './service/router';
/** @deprecated @public */
export type { RouterOptions } from './service/router';
/** @public */
export { azureResourceConfig } from './config';
