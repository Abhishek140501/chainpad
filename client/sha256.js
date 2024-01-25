/*@flow*/
/*
 * Copyright 2014 XWiki SAS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var CryptoJS = require('crypto-js');

/*::
export type Sha256_t = string;
*/

function encodeText(str) {
    // Use TextEncoder to properly encode the input string
    var textEncoder = new TextEncoder();
    return textEncoder.encode(str);
}

module.exports.check = function (hex /*:any*/) /*:Sha256_t*/ {
    if (typeof(hex) !== 'string') { throw new Error(); }
    if (!/[a-f0-9]{64}/.test(hex)) { throw new Error(); }
    return hex;
};

module.exports.hex_sha256 = function (d /*:string*/) /*:Sha256_t*/ {
    d = d+'';
    var ret = asm_sha256.hex(brokenTextEncode(d));
    if (Common.PARANOIA) {
        var oldHash = old.hex_sha256(d);
        if (oldHash !== ret) {
            try {
                throw new Error();
            } catch (e) {
                console.log({
                    hashErr: e,
                    badHash: d,
                    asmHasher: asm_sha256.hex,
                    oldHasher: old.hex_sha256
                });
            }
            return oldHash;
        }
    }
    return ret;
};

Object.freeze(module.exports);
