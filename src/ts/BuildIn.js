/**
 *
 * @param any
 * @return {Boolean}
 */
isSet = any => any !== undefined && any !== null;

/**
 *
 * @param $elem {Object}
 * @return {Boolean}
 */
existElement = $elem => $elem.length !== 0;


/**
 *
 * @param time {Number}
 * @return {*}
 */
wait = time => {
    let dfd = $.Deferred();
    setTimeout(function(){
        dfd.resolve();
    },time);
    return dfd.promise();
};