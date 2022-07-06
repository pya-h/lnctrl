import { error_codes } from "config";

export default class NotScalarError extends Error {
    
    constructor(cause = null){ // the parameter with problem
        super(cause ? `${cause} => این عبارت باید اسکالر باشد!!` : "این خطا بدلیل استفاده از یک عبارت غیر اسکالر در مکان غیر مجاز رخ داده است!")
        this.name = "NotNumberError";
        this.type = "Numeric";
        this.code = error_codes.not_scalar;
        this.cause = cause;
    }

    describe = () => {
        console.log(this.message + (this.cause ? "\n" + this.cause : ""));
        return this.message + (this.cause ? "\n" + this.cause.toString() : "");
    }
}