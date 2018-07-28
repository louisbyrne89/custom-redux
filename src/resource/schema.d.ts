/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface Schema {
    /**
     * The path to create the component.
     */
    path?: string;
    /**
     * The name of the project.
     */
    project?: string;
    /**
     * The name of the actions file.
     */
    name: string;
    /**
     * Specifies if a spec file is generated.
     */
    spec?: boolean;
    /**
     * Flag to skip the module import.
     */
    skipImport?: boolean;
    /**
     * Allows specification of the declaring module.
     */
    module?: string;
    /**
     * Specifies if declaring module exports the component.
     */
    export?: boolean;
    /**
     * Allows specification of the root redux resource.
     */
    root?: string;
    /**
     * Specifies if appending root resource name to name.
     */
    appendRoot?: boolean;
    /**
     * Whether resource belongs in the store
     */
    store?: boolean
}
