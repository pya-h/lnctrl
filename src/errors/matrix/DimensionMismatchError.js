import { error_codes } from "config";

export default class DimensionMismatchError extends Error {
    constructor(cause = null) {
        // the parameter with problem
        super(
            cause
                ? `Mismatch: the number of columns of ${cause.a} does not match the number of rows of matrix ${cause.b}`
                : "This error occurred due to the multiplication of two matrices in which the number of columns of the first matrix is not equal to the number of rows of the second matrix!"
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
