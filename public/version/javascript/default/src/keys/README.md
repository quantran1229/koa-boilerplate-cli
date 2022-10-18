# Gen key for JWT using RSA

Run gen script

```bash
openssl genrsa -out private.rsa 1024 # private key
openssl rsa -in private.rsa -pubout > public.pem # public key
```

After create 2 keys(private + public). 

Update the .env file.

```
PRIVATE_KEY_PATH=/src/keys/private.rsa
PUBLIC_KEY_PATH=/src/keys/public.pem
```