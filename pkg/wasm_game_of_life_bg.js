import * as wasm from './wasm_game_of_life_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/
export function init_panic_hook() {
    wasm.init_panic_hook();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {ElectricField} electric_field
*/
export function main(electric_field) {
    _assertClass(electric_field, ElectricField);
    wasm.main(electric_field.ptr);
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
*/
export class ElectricField {

    static __wrap(ptr) {
        const obj = Object.create(ElectricField.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_electricfield_free(ptr);
    }
    /**
    * @returns {ElectricField}
    */
    static new() {
        const ret = wasm.electricfield_new();
        return ElectricField.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.electricfield_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = wasm.electricfield_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    cqn() {
        const ret = wasm.electricfield_cqn(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get_pointer() {
        const ret = wasm.electricfield_get_pointer(this.ptr);
        return ret;
    }
    /**
    * @param {number} q
    * @param {number} x
    * @param {number} y
    */
    install_charge(q, x, y) {
        wasm.electricfield_install_charge(this.ptr, q, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    remove_charge(x, y) {
        wasm.electricfield_remove_charge(this.ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    control_charge(x, y) {
        wasm.electricfield_control_charge(this.ptr, x, y);
    }
    /**
    */
    not_control_charge() {
        wasm.electricfield_not_control_charge(this.ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    mouse_charge(x, y) {
        wasm.electricfield_mouse_charge(this.ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    fix_charge(x, y) {
        wasm.electricfield_fix_charge(this.ptr, x, y);
    }
    /**
    * @returns {boolean}
    */
    test2() {
        const ret = wasm.electricfield_test2(this.ptr);
        return ret !== 0;
    }
}

export function __wbg_new_abda76e883ba8a5f() {
    const ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_658279fe44541cf6(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_error_f851667af71bcfc6(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

