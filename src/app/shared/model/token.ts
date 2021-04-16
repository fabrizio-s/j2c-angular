import jwt_decode from "jwt-decode";
import { Optional } from "typescript-optional";

export class Token {

    private static readonly ANONYMOUS = new Token(
        Number.MIN_SAFE_INTEGER,
        new Date(1970, 0),
        [],
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiLiiJI5MDA3MTk5MjU0NzQwOTkxIiwiZXhwIjotMzYwMDAwMCwiYXV0aG9yaXRpZXMiOltdfQ.hkjIbyZaxGOxmEpFpbYtFuVUFUxef3ie-qGC69RC2aE'
    );

    private constructor(
        private readonly _sub: number,
        private readonly _exp: Date,
        private readonly _authorities: string[],
        private readonly _encoded: string
    ) { }

    public isAnonymous(): boolean {
        return this === Token.ANONYMOUS;
    }

    public isExpired(): boolean {
        return this._exp.getTime() - Date.now() <= 15000;
    }

    public isValid(): boolean {
        return !this.isAnonymous() && !this.isExpired();
    }

    public hasAuthority(authority: string): boolean {
        return this._authorities.includes(authority);
    }

    public get sub(): number {
        return this._sub;
    }

    public get exp(): Date {
        return this._exp;
    }

    public get authorities(): string[] {
        return this._authorities;
    }

    public get encoded(): string {
        return this._encoded;
    }

    public static anonymous(): Token {
        return Token.ANONYMOUS;
    }

    public static decode(token: string | null): Optional<Token> {
        if (!token) {
            return Optional.empty();
        }

        const optional = decode(token);

        if (optional.isEmpty()) {
            return Optional.empty();
        }

        const decoded = optional.get();

        const sub = _sub(decoded.sub);
        const exp = _exp(decoded.exp);
        const authorities = _authorities(decoded.authorities);

        if (sub.isEmpty() || exp.isEmpty()) {
            console.error('Unexpected token format: ', decoded);
            return Optional.empty();
        }

        return Optional.ofNonNull(
            new Token(
                sub.get(),
                exp.get(),
                authorities,
                token
            )
        );
    }

}

const decode = (str: string): Optional<any> => {
    try {
        return Optional.ofNullable(jwt_decode(str));
    } catch {
        console.error('Unparsable token: ', str);
    }
    return Optional.empty();
}

const _sub = (x: any): Optional<number> => {
    if (Number.isInteger(x)) {
        return Optional.ofNonNull(x);
    } else if (typeof x === 'string') {
        try {
            return Optional.ofNonNull(parseInt(x));
        } catch {
            console.error('Failed to parseInt token sub: ', x);
        }
    }
    return Optional.empty();
}

const _exp = (x: any): Optional<Date> => {
    if (Number.isInteger(x)) {
        return Optional.ofNonNull(new Date(x*1000));
    }
    return Optional.empty();
}

const _authorities = (x: any): string[] => {
    if (Array.isArray(x)) {
        return (x as any[]).filter(authority => !!authority && typeof authority === 'string');
    }
    return [];
}
