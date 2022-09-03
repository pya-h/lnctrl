import Algebra from "./algebra";
import Poly from "./algebra/functions/poly";
import DimensionMismatchError from "errors/matrix/DimensionMismatchError";

class Matrix {
    constructor(M, name = null) {
        if (M && M instanceof Array) this.M = [...M];
        else this.M = M;

        this.name = name;
    }

    det = (matrix = this.M) => {
        const n = matrix.length;
        if (n === 1) return matrix[0];
        if (n === 2)
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        let determinant = 0, sign = 1;
        for (let i = 0; i < n; i++) {
            let Mij = [...matrix];
            Mij.shift();
            Mij = Mij.map((row) => row.filter((_, col) => col !== i));

            determinant += sign * matrix[0][i] * this.det(Mij);
            sign *= -1;
        }
        return determinant;
    };
    adj = () => {
        const n = this.M.length;
        let adj = [];
        if (n === 2 && this.M[0] instanceof Array && this.M[0].length === n) {
            adj = [
                [0, 0],
                [0, 0],
            ];
            adj[0][1] = -this.M[0][1];
            adj[1][0] = -this.M[1][0];
            adj[0][0] = this.M[1][1];
            adj[1][1] = this.M[0][0];
        }
        return new Matrix(adj);
    };

    transpose = () => {
        const n = this.M.length;
        let trans = [];

        if (this.M[0] instanceof Array) {
            const m = this.M[0].length;
            if (m > 1) trans = Array(m).fill(Array(n).fill(0));
            else if (m === 1) trans = Array(n).fill(0);

            for (let i = 0; i < n; i++) {
                if (m > 1) {
                    for (let j = 0; j < m; j++) {
                        trans[i][j] = this.M[j][i];
                    }
                } else if (m === 1) {
                    trans[i] = this.M[i][0];
                }
            }
        } else {
            trans = Array(n).fill(Array(1).fill(0));
            for (let i = 0; i < n; i++) {
                trans[i][0] = this.M[i];
            }
        }

        return new Matrix(trans);
    };

    toString = (parenthesis = true) => {
        const rows = this.M.length;
        let formula = "";
        if (this.M && this.M instanceof Array) {
            formula = parenthesis ? "\\begin{pmatrix} " : "\\begin{vmatrix}";

            for (let i = 0; i < rows; i++) {
                if (this.M[i] && this.M[i] instanceof Array) {
                    const columns = this.M[i].length;

                    for (let j = 0; j < columns; j++) {
                        formula +=
                            this.M[i][j].toString() +
                            (j < columns - 1 ? " && " : "");
                    }
                } else formula += this.M[i].toString();

                formula += i < rows - 1 ? " \\\\ " : ""; 
            }
            formula += parenthesis ? " \\end{pmatrix}" : "\\end{vmatrix}";
        } else formula += this.M.toString(parenthesis);
        return formula;
    };

    static dimens = (A) => {
        let X = A;
        if (X instanceof Matrix) X = [...A.M];
        if (X instanceof Array) {
            if (X[0] instanceof Array) return [X.length, X[0].length]; // [[a00, a01, ...], [a10, a11, ...], ...]
            return [1, X.length]; // [a0, a1, a2, ...]
        }
        return [1, 1];
    };

    at = (i, j) =>
        this.M[0] instanceof Array && this.M.length > 1
            ? this.M[i][j]
            : this.M[j]; // **** NEEDS Ediitng or not?

    multiply = (A) => {
        const [m, n] = Matrix.dimens(this.M);
        const [p, q] = Matrix.dimens(A);
        let B = [];
        if (m === 1 && n === 1) {
            // mode 0 ,multiply by number
        } else if (p === 1 && q === 1) {
            // mode 0 multiply by number
        } else {
            if (n === p) {
                if (A instanceof Array) A = new Matrix(A); // for when the user sends an array instead of a matrix object
                if (m > 1) {
                    B = Array(m)
                        .fill(0)
                        .map((b) => Array(q).fill(0));
                    for (let i = 0; i < m; i++) {
                        for (let j = 0; j < n; j++) {
                            for (let k = 0; k < q; k++) {
                                const A_jk = A.at(j, k);
                                if (this.M[i][j] instanceof Algebra) {
                                    if (!(B[i][k] instanceof Algebra))
                                        B[i][k] = new Poly([B[i][k]]);
                                    B[i][k] = B[i][k].add(
                                        this.M[i][j].multiply(A_jk)
                                    );
                                } else if (A_jk instanceof Algebra) {
                                    if (!(B[i][k] instanceof Algebra))
                                        B[i][k] = new Poly([B[i][k]]);
                                    B[i][k] = B[i][k].add(
                                        A_jk.multiply(this.M[i][j])
                                    );
                                } else {
                                    B[i][k] += this.M[i][j] * A_jk;
                                }
                            }
                        }
                    }
                } else {
                    // to make the agorythm with less 'if checks', i didn't use this.at(i, j)
                    B = Array(q).fill(0);
                    for (let j = 0; j < n; j++) {
                        for (let k = 0; k < q; k++) {
                            const A_jk = A.at(j, k);

                            if (this.M[j] instanceof Algebra) {
                                if (!(B[k] instanceof Algebra))
                                    B[k] = new Poly([B[k]]);
                                B[k] = B[k].add(this.M[j].multiply(A_jk));
                            } else if (A_jk instanceof Algebra) {
                                if (!(B[k] instanceof Algebra))
                                    B[k] = new Poly([B[k]]);
                                B[k] = B[k].add(A_jk.multiply(this.M[j]));
                            } else B[k] += this.M[j] * A_jk;
                        }
                    }
                }
            } else {
                // error checks
                // RETURN THE MISMATCH MATRIX

                throw new DimensionMismatchError(
                    this.name && A.name ? { a: this.name, b: A.name } : null
                );
            }
        }
        return new Matrix(B);
    };
}

export default Matrix;
