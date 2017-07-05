/**
 * Created by jinjae on 2017-07-04.
 */

module.exports = function() {
    function DEGREE_TO_RADIAN(degree) { return degree * Math.PI / 180; }

    var _quaternion = function(t, x, y, z) {
        return {t : t, x: x, y: y, z: z};
    };

    var _mulQuaternion = function(left, right) {
        var ans = _quaternion(0,0,0,0);
        var d1, d2, d3, d4;

        d1 = left.t * right.t;
        d2 =-left.x * right.x;
        d3 =-left.y * right.y;
        d4 =-left.z * right.z;
        ans.t = d1 + d2 + d3 + d4;

        d1 = left.t * right.x;
        d2 = left.x * right.t;
        d3 = left.y * right.z;
        d4 =-left.z * right.y;
        ans.x = d1 + d2 + d3 + d4;

        d1 = left.t * right.y;
        d2 =-left.x * right.z;
        d3 = left.y * right.t;
        d4 = left.z * right.x;
        ans.y = d1 + d2 + d3 + d4;

        d1 = left.t * right.z;
        d2 = left.x * right.y;
        d3 =-left.y * right.x;
        d4 = left.z * right.t;
        ans.z = d1 + d2 + d3 + d4;

        return ans;
    };

    var _createQuaternion = function(t, x, y, z) {
        var ans = _quaternion(0,0,0,0);

        ans.t = Math.cos(t/2);
        ans.x = x * Math.sin(t/2);
        ans.y = y * Math.sin(t/2);
        ans.z = z * Math.sin(t/2);

        return ans;
    };

    function _rotationQuaternion(p, th, x, y, z) {
        if(th === 0) return p;

        var ans = _quaternion(0,0,0,0);
        var t = DEGREE_TO_RADIAN(th);

        var q = _createQuaternion(t, x, y, z);
        var r = _createQuaternion(t, -x, -y, -z);

        ans = _mulQuaternion(q, p);
        ans = _mulQuaternion(ans, r);

        return ans;
    }

    function rotation(px, py, pz, ax, ay, az) {
        var p = _quaternion(0, px, py, pz);
        p = _rotationQuaternion(p, ax, 1, 0, 0);
        p = _rotationQuaternion(p, ay, 0, 1, 0);
        p = _rotationQuaternion(p, az, 0, 0, 1);

        p.x = Math.round(p.x * 1000)/1000;
        p.y = Math.round(p.y * 1000)/1000;
        p.z = Math.round(p.z * 1000)/1000;

        return {x: p.x, y: p.y, z: p.z};
    }

    return {
        rotation: rotation
    }
};