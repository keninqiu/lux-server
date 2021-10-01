import { execSync } from 'child_process';
const querystring = require('querystring');

export class GoogleService {
    translate(text: string) {

        text = encodeURI(text);
        console.log('text==', text);
        //text = text.replace(new RegExp('"', 'g'), '\\"').replace(new RegExp("'", 'g'), "\\\'").replace(new RegExp(' ', 'g'), '%20');
        const curlCommand = "curl 'https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=4554740978145578046&bl=boq_translate-webserver_20210929.09_p0&hl=en&soc-app=1&soc-platform=1&soc-device=1&_reqid=1637397&rt=c' \
        -H 'authority: translate.google.com' \
        -H 'pragma: no-cache' \
        -H 'cache-control: no-cache' \
        -H 'sec-ch-ua: \"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"' \
        -H 'x-goog-batchexecute-bgr: [\";YH64fjPQAAbiTIIk4kxfvV4Qd7D8l98mACkAIwj8RskEfEbUM1B0N8wdah0KlKNeHuFUD31uBnBFNDGnWrNlwbyaGB8AAABeTwAAAA91AQeEAoUKYiFygD7u2SJ3Cf4Zi8qof6-DgWUdgiUqdeFbPeFkwGEMMZVea62_qaZz_UtHYSaY0_y8h7AqCZ15utvSex0IrjlDVr1M1aXfyN3LP5NSLqxXBj6g_KH-sI8wEZShIe6xKo4ABE5Rh__cyl9XXwQsdVUOopF5y99c3pIMlSW8tdh3HBaDHJ13G46vnfapzft-CVRQ4H-E16Mg3OZz227I_DLbKAhCd7U32-lTycDdw1QvKufFhJ55QlOHIxpjRZedW_dkOPoWZ65Gj59mGpf0XrRsrovin0bGks9Lk6YejM64KGSu1YF1v31OyidrvrsBaNBAMyLoalptv29eirbjZaZ9mSh6wsiDtstdYsZrR4bHjD9j0KZQtr3UffpZSHck2XhQCX1d5HJQZ42LCTqQRHutEoJ7b7tY94s5QClnf9MtWa59-Rx5So4LgtM5lKIwZ9ZS-vB-QN7uN_T7nBaWcabFrWjanjhf0XtGkfUANgjzL1NyhUXrt3HNUlK3RD4xr48UJ8tJO1Pgu3I8UKBeSopPXNiLxl3MeBGZlVtmpPS-EzppWKhTtvpFZmSpqoj_I_mr_DQ0fIVfpCIH41sqELP9sfl1QHL4mDCYJaEuJaUAXn3cHam5eYN4-84PueyLknAPtwN7mBLx9N6MTVWGZwkiJDwbNzIgZtt8_qHC2VBtxgyWiHYvDCHRbihg2W8RPLuRd2oHrAVhJIK0ICNdcrVESv6vRm6qAk5h84BvkV8mgqd1DJTjxnYxE0P_TBuPMWd5XwEpv8nmLKu46Q05vSOZ3DzNxLqpKFU6TyBYLma7GWhzeJ4HkmYy1qSA52SJjIOZgejiYTktJvq1UqsijUizIR0\",null,null,20,null,null,null,0,\"2\"]' \
        -H 'x-same-domain: 1' \
        -H 'content-type: application/x-www-form-urlencoded;charset=UTF-8' \
        -H 'sec-ch-ua-mobile: ?1' \
        -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36' \
        -H 'sec-ch-ua-platform: \"Android\"' \
        -H 'accept: */*' \
        -H 'origin: https://translate.google.com' \
        -H 'x-client-data: CIe2yQEIpLbJAQjEtskBCKmdygEI+eHKAQiMnssBCO/yywEItPjLAQie+csBCPn5ywEIr/rLAQih/ssBCL/+ywEInv/LAQ==' \
        -H 'sec-fetch-site: same-origin' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-dest: empty' \
        -H 'referer: https://translate.google.com/' \
        -H 'accept-language: en-US,en;q=0.9,zh;q=0.8' \
        -H 'cookie: _ga=GA1.3.1927028768.1567101727; CONSENT=YES+CA.en+20180225-07-0; SEARCH_SAMESITE=CgQIypIB; OGPC=19022519-1:19024399-1:19022591-1:19020770-1:19022552-1:19022958-1:; _gid=GA1.3.2086525403.1633053124; OTZ=6179152_72_76_104100_72_446760; SID=Cgg9YLz82blRmTUmIBJZg0xsoyU5S4veFmfoBUY2pzVn61IjWyMozjmMzfHsRb3IH8JL9w.; __Secure-1PSID=Cgg9YLz82blRmTUmIBJZg0xsoyU5S4veFmfoBUY2pzVn61IjJR3hZBl4lNj2Gjdf1ZfBUw.; __Secure-3PSID=Cgg9YLz82blRmTUmIBJZg0xsoyU5S4veFmfoBUY2pzVn61IjWfx85AKg3C5rNoQplqsA_g.; HSID=Ab_bRL8UFZQNGsTyJ; SSID=AmecT3vQ3Pp0Jdfxx; APISID=cXboKX9xJ7WZk8Co/AfQNed7JlCFEKc2Nc; SAPISID=ZaaKa0dAzZtILK22/AjbAr9I6MUy0910j5; __Secure-1PAPISID=ZaaKa0dAzZtILK22/AjbAr9I6MUy0910j5; __Secure-3PAPISID=ZaaKa0dAzZtILK22/AjbAr9I6MUy0910j5; NID=511=RfizLJH9O3caE5wKuaDXvWZOflygoG2wCNgcpE0Mhwe5VFNvO9ugzBGi_XMGSCwFh5uCUNA4867wJ0I2qd88ccjwsSm0r829lfPy26oj6I-EllyRyFDif8ckRvAjt5bhTdJ4mP7DVRqGx1FkOU_P1R0rYO3O8_UQx9oM4bfq55elpvZIglowxuUgXZcuj9w2LDHBa-rWAZT743B2EMoYZD7Dsd1WqI_vMWwismtZL71ao2KmmEaKV-gR5XnN9xt0JwgjmgbwMUQPLaIBaLJLXX7NPjKdfg79ncmBGhnAHPNT8yqYq7vU-NBs3GyxtaT1D3JjfWwJ7KKqKgq3ZiBzsaFc3QkchFE; 1P_JAR=2021-10-01-14; SIDCC=AJi4QfFAuD122wruBCV-jmu7ATEUkbM9HjQAHenle5wdmgK8QdMUEbZStqc9U-aPQBJybDT8Phw; __Secure-3PSIDCC=AJi4QfEa17KNXA63hilC5YPzEuZ3DxEudIs2PmxgRfgwsdmQ_YNHYmQnuX3uovglJfR8OO-q_w' \
        --data-raw $'f.req=%5B%5B%5B%22MkEWBc%22%2C%22%5B%5B%5C%22" + text + "%5C%22%2C%5C%22en%5C%22%2C%5C%22zh-CN%5C%22%2Ctrue%5D%2C%5Bnull%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AD08yZmQe-9wvL3gS32OSolBvmTR%3A1633098195454&' \
        --compressed";


        console.log('curlCommand===', curlCommand);
        const output = execSync(curlCommand, { encoding: 'utf-8' });

        console.log('output=', output);
        const str1 = ',[[\\"';
        const str2 = '\\",';
        const output1 = output.substring(output.indexOf(str1) + str1.length);
        const output2 = output1.substring(0, output1.indexOf(str2));
        return output2;
    }
}