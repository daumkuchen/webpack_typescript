export default class Color {

    /**
     * @param {String} hexCode
     * @return {Array} RGB
     */
    static hexToRgb(hexCode) {
        if (hexCode.split('').length === 6 || hexCode.split('').length === 3) {
            return Color._convertRgb(hexCode.split(''))
        } else {
            throw new Error("You have to Set 3 characters or 6 character hex code.");
        }
    }
    
    /*
     * @param {Number} R
     * @param {Number} G
     * @param {Number} B
     * @return {String} hexCode
     */
    static rgbToHex(R, G, B) {
        let rgb = [Number(R).toString(16), Number(G).toString(16), Number(B).toString(16)],
            hex = "";

        for (let i = 0; i < 3; i++) {
            if (1 === rgb[i].length) {
                hex += "0" + rgb[i]
            } else {
                hex += String(rgb[i])
            }
        }

        return hex;
    }

    /**
     *
     * @param hexCodeArray {String}
     * @return {Array}
     * @private
     */
    static _convertRgb( hexCodeArray ){
        let res = [],
            i;

        if ( 6 === hexCodeArray.length ) {
            for ( i = 0; i < 3; i++ ) {
                res.push( parseInt( String( Color._chunk( hexCodeArray )[i] ), 16 ) );
            }
        } else {
            for ( i = 0; i < 3; i++ ) {
                res.push( parseInt( String( hexCodeArray[i] + hexCodeArray[i] ), 16 ) );
            }
        }

        return res;
    }

    /**
     *
     * @param array {Array}
     * @return {Array}
     * @private
     */
    static _chunk(array) {
        let n = 2,
            len = Math.round.apply(array.length / n, 10),
            ret = [];

        for (let i = 0; i < len; i++) {
            ret.push(array.slice(i * n, i * n + n)[0] + array.slice(i * n, i * n + n)[1])
        }

        return ret;
    }

}