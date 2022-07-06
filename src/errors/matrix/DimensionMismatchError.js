import { error_codes } from "config";

export default class DimensionMismatchError extends Error {
    constructor(cause = null) {
        // the parameter with problem
        super(
            cause
                ? `عدم تطابق تعداد ستون های ${cause.a} با تعداد سطرهای ماتریس ${cause.b}`
                : "ستو این خطا بدلیل ضرب دو ماتریسی اتفاق افتاده است که در آن تعداد ستون های ماتریس اولی با تعداد سطرهای ماتریس دوم برابر نیست.!"
        );
        this.name = "DimensionMismatchError";
        this.type = "Matrix";
        this.code = error_codes.dimension_mismatch;
        this.cause = cause;
    }

    describe = () => {
        console.log(this.message + (this.cause ? "\n" + this.cause : ""));
        return this.message + (this.cause ? "\n" + this.cause.toString() : "");
    };
}
