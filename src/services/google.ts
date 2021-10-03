import { execSync } from 'child_process';
const querystring = require('querystring');
export class GoogleService {
    translate(originText: string) {

        let text = originText.replace(new RegExp('"', 'g'), ' ').replace(new RegExp('&', 'g'), 'and');
        text = encodeURI(text).replace(new RegExp("'", 'g'), "\\\'");
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


        //console.log('curlCommand===', curlCommand);
        const output = execSync(curlCommand, { encoding: 'utf-8' });

        console.log('output=', output);
        const str1 = ',[[\\"';
        const str2 = '\\",';
        const output1 = output.substring(output.indexOf(str1) + str1.length);
        let output2 = output1.substring(0, output1.indexOf(str2));
        if(output2 == originText) {
            console.log('they are equal.');
        }
        return output2;
    }



    translate2(text: string) {
 
        text = text.replace(new RegExp('"', 'g'), ' ').replace(new RegExp('&', 'g'), 'and');
        text = encodeURI(text).replace(new RegExp("'", 'g'), "\\\'");
        //text = text.replace(new RegExp('"', 'g'), '\\"').replace(new RegExp("'", 'g'), "\\\'").replace(new RegExp(' ', 'g'), '%20');
        const curlCommand = "curl 'https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=5634689650896276426&bl=boq_translate-webserver_20210929.09_p0&hl=en&soc-app=1&soc-platform=1&soc-device=1&_reqid=445731&rt=c' \
        -H 'authority: translate.google.com' \
        -H 'pragma: no-cache' \
        -H 'cache-control: no-cache' \
        -H 'sec-ch-ua: \"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"' \
        -H 'x-goog-batchexecute-bgr: [\";ory4vPHQAAbiTIIk4kxfQ5WYnR-B8vEmACkAIwj8RvsuPb-NoxJHOUbMVCRDmKLjJJ-oOVgoVNw3_K3Zw-OpGhDneB8AAABeTwAAAA51AQcXACDL5CRmfsPTiOgaKR2nZVR2D17OYavL-U01TaLnp9SGtIQCb3RhEpBQDTTD_8vaKuWB91mB-3tcwOt_wMvEJb0GxSrPXGQZrGZLv9dJrM7H_3HTqw6bH69J0kkub0Y6MiH5DBdSKH1145oY-D3uE-uwFj42Qo-Sec_GGNoQ5QGqcWxV9JNPlYVX8UC0LK_mQaQOmKwHDessd9M400bxHe39bsi3fLGXymiXJOuHlvH0VdiBNJ2AaulepAOzOuEzZYI06yAcznjh0BU_QO9aP2zw2YX1K0Ri-lTp-hlEzAIUXZJjtT5G6Du7g5zRUQzMLV1S2xOOJgy2OPwtUyzR2nlrK2HXRUN3ddGm3VUIEuUIAiBZXPMhTWfhGy51sTvc0-RHesu-0_eUZgp1AL7yDsDSSfW6UvpshJsSguKnt_6MTKvMypyrpZsjPJwUmg2gxbRSfbuKhxgqcofJc8eA-DuAD5w6XduK2yYV0OH9ahg85zdi-cRqrVGuO_tgFr-sThH6YOFsJdzFFpn-46N_VNzXkJkFBqSQc_3AZr3lYm4hdnzhBGwlEJ8TNlHAq9rCCOEPNP9ybfgLRVzPUSYOREG3Q9MPNN9bI2G7HusOEZ9osIdi3czJPD-5GgDIbuDYEnQFhy9IVrR2KZ-0myPRGLZZdbpwuZ5S8eZlDQXCHJMn-i92DByQLQTvH9Qa-Gi6lCxJV1t7wfQDn4dcdWjE6ZsHTuVF1EHLCg8ctby93A2SiZEMrLkhzafdfx4qe5jU7oNsK89phQlpYcKs9eiCGaCRqOlTVFLkJLBxq8HDo4JDWl5r8CfkqRZM7EqMLKEOwD094Iu4KaBTVdtwYsJbfCQW51TCvGtIKIB1oho9zU4qFUmA\",null,null,143,null,null,null,0,\"2\"]' \
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
        -H 'cookie: _ga=GA1.3.1927028768.1567101727; CONSENT=YES+CA.en+20180225-07-0; SEARCH_SAMESITE=CgQIypIB; OGPC=19022519-1:19024399-1:19022591-1:19020770-1:19022552-1:19022958-1:; _gid=GA1.3.2086525403.1633053124; OTZ=6179152_72_76_104100_72_446760; HSID=Ajhe4M3H2RYl9OYPB; SSID=AvTTcTu8IUOdiDiDW; APISID=beZY7n9RgsafgiQH/AL4JDyBvj0YoF5-HF; SAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-1PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-3PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; SID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyF8Wqyo4ZVFCSgu51dI4srw.; __Secure-1PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KydgulDrv7W2X-Mml1Jsspxw.; __Secure-3PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyREdZ-nwyDOwSyLgPAGagsw.; NID=511=vp7HygZgmU8uigcRkcoUSWrhrEp2xQSez0nBOc9sYyUmhbz7EjwrWhQ1sAkpAWxsrRutEcbuPPCwF5OqKwl7RCPgyoLVZ9Xz15Jv39Vel9j29WUOIk4e6hfczjtQDWqXoDsdSI7ASbt6ackp5JP-i6bCW5l8f2JTcuBxv5NdxLUT3XIugVU6sLayiyJGBRKi80wl5iif_WHfpax7TKzDf1PLgFYxzNn4E1qeWk4lXRckiXQukRgFTrv7vu5rI0id0hMVlmAZRxEmJNgowODulzGclopzOKT1MaBvfPRdhIyz-ISL-kl-cCmuhZWT9c9eZk3pOiEmOVjon871I8OFjZ0upz7i1-GgDXi8VM2Rz4a3q8e-XHUgaqwLBfogouOqwYyxe7SXAWDt-PniwGCA_UcH0xWIcmPHne1e8gkHbW_j9rAh3PJiAMiKaATRGw87FbKSThskj7lHnrVKFGRUUVY8w_MHXK_-nGF02y-LbVcXZCQ; 1P_JAR=2021-10-02-16; SIDCC=AJi4QfE6BQq5ePO9OHQW5etqN4KRoXvsJ52D-78SSrTq7tL9vLwfWgIzHlUvDCyWIm1wCem5kWY; __Secure-3PSIDCC=AJi4QfHS38qFGpVtyB657_2qsfi0cvCviLOF2mK0RcpQ0DEJ5MaApvX2HtA_ZQRHr4qhbLmTeg' \
        --data-raw 'f.req=%5B%5B%5B%22MkEWBc%22%2C%22%5B%5B%5C%22" + text + "%5C%22%2C%5C%22en%5C%22%2C%5C%22zh-CN%5C%22%2Ctrue%5D%2C%5Bnull%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AD08yZlOPMKbfmsVP4ZRqLCaaDZU%3A1633192929691&' \
        --compressed";


        //console.log('curlCommand===', curlCommand);
        const output = execSync(curlCommand, { encoding: 'utf-8' });

        console.log('output===', output);
        const str1 = ',[[\\"';
        const str2 = '\\",';
        const output1 = output.substring(output.indexOf(str1) + str1.length);
        const output2 = output1.substring(0, output1.indexOf(str2));
        return output2;       
    }


        translate3(text: string) {
 
        text = text.replace(new RegExp('"', 'g'), ' ').replace(new RegExp('&', 'g'), 'and');
        text = encodeURI(text).replace(new RegExp("'", 'g'), "\\\'");
        //text = text.replace(new RegExp('"', 'g'), '\\"').replace(new RegExp("'", 'g'), "\\\'").replace(new RegExp(' ', 'g'), '%20');
        const curlCommand = "curl 'https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=-5836442219320277637&bl=boq_translate-webserver_20210929.09_p0&hl=en&soc-app=1&soc-platform=1&soc-device=1&_reqid=448662&rt=c' \
  -H 'authority: translate.google.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'sec-ch-ua: \"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"' \
  -H 'x-goog-batchexecute-bgr: [\";yNa41pvQAAbiTIIk4kxfPtVYiVCs3pkmACkAIwj8RuSp1SR2djRxBkurHhxr3pE_F7S73bF94cc8uTXVysdcfqhY1h8AAABdTwAAABF1AQcXAO0aUGa6NEtaQ-AnCs3rYQbwZW_RHF4u1H9FXb_60fN_Idn8hSfJ3UqPxBqrp3b9ORJGFm44CCqBWyVNAW7NCuQ9QN8shuMndc8HcLEmByyAWioGuC9Nkhk08hbN-Y9coOl0izwK76QABR1SXysqexOgtUTwqJZXWqKD79rsZbQb0OAX3CoG2dSmMi5gU1pxsALrIUwsxeplXtgoJt6pJITfHIK5YDljvIVfVfOLHhv1A51QCphuUwTVqvAym_PpgRM0pR_nFBMwfm4TwMS7ZNh1GjqSmmPut-K6TdPwEZSe5jMwXn6Uribx4Qtc4wGEAnbph5H4Vdnlcz1DKFevDgfUYEbufaro0xpIsVYOoKDttm1l5LXfJ6IR3TMVwS_cnv-Kvgdc1yIOcOmqeTPYUvQG-dunooldEhq_uh8rnX_NnsvkQf1SLH_UhtYeTxOb8pbZo4leluDyXc5ooouKUdrXFwRug3HgBLal2W_NUuwQCD2VaN3GK-hsJEYkxAivy_faQOq9ynUsV9Il7IPZ3xMHsQrywgSb1yoaKeV1VUoiC3EIqGL7fezYouI-dMBbfh-ByhUmhBWbEnwKja2Hm6l8Q2EqJvjr74CPDmHJZYCTctQrn2eJ6lqQMVjl6-zzQbei8C2Tsr2QW9Wb3tPGohv1TQ_kL0gaQzNgp62EqX-P63u1m0V8xXbqt9vMQDRQiPnp5MKnI2y4h4rqleZkzd8r0UozcK8SwTDT6GvgSh6ms3gtkdQshVscgEtU7-BEhPXmvqu9ncX7XamztWZL359Gzu5yTRAaybwmCLipVFBvkEcMuWuvulwCgv3imlWk2j0n9gekPLJUlinLJSuqcDkAbfGelRTNl32GYBNlNO-ikk8J-NtcS2BMSN7q83FZo8EYtG1Gr5auvr1hOxm5aADpxm1wiHfJ7u2cdUZowH1zTpFiXFMRtjZYdORGAmixnGnpBkr2Bp4htRqR007kQK9Ir-KFxzYZE_dxCRFjQ1pa1UTJjnIxHaLm0KV7Vz8Tn5KD8bS69_tnBxvddNlZokVt3CRfwTlOh0fEwQTD_zRrU_4vWrIJjx2o3tJVceVUDvZaI-yoLhK15Lk2I7l6t-F-_NI7yFPDe6x80ekaN5jRjG3zKC0getVcZnXQHSiWL2plsEcBx9I\",null,null,143,null,null,null,0,\"2\"]' \
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
  -H 'cookie: _ga=GA1.3.1927028768.1567101727; CONSENT=YES+CA.en+20180225-07-0; SEARCH_SAMESITE=CgQIypIB; OGPC=19022519-1:19024399-1:19022591-1:19020770-1:19022552-1:19022958-1:; _gid=GA1.3.2086525403.1633053124; OTZ=6179152_72_76_104100_72_446760; HSID=Ajhe4M3H2RYl9OYPB; SSID=AvTTcTu8IUOdiDiDW; APISID=beZY7n9RgsafgiQH/AL4JDyBvj0YoF5-HF; SAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-1PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-3PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; SID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyF8Wqyo4ZVFCSgu51dI4srw.; __Secure-1PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KydgulDrv7W2X-Mml1Jsspxw.; __Secure-3PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyREdZ-nwyDOwSyLgPAGagsw.; NID=511=nWN6JI1nZO1NtepMiTjFcRQhPjuu10-neX_yPonyjQJTi2AJILtX5kXLTbxOYhRPqEfXs4SbBmh2X6l9wW3qEMJt0mpzcj8PiF3VEctlUtHix-5bklYAvj6zwFX3pJMAggRC4wTfybq_zrK3xowUDci1koxmKeZ76XVminWeOm0BzePuBz85UJWJYwL5mHWdTR7bz53uJSetImy7cmKNcdbLDkYZgFd7XYoV7txqXbFBEtAx-ZgQ6KKJ8jv3g1Y-C2dQx7Tn_hn--iUZVkRamOAFulf189zZl65sVKuM157AHsLBavNd7Mkq8yMXd3puA0G82yU2O5zSYS1pBTCO-a68vmS3x_KOgTapVnhLjx2CkUgsqZoMCIILmG7Rvs24yyA42HARe6tRjeAdAZOC-Y76kfmHzRIS2rwgE_YqesOzsd-FFVjpmn96OLruLffsMoqQP5j51VHX_-b9S2hJqYNy4BJh8rfFde0wnLRTiYJniko; 1P_JAR=2021-10-02-17; SIDCC=AJi4QfHj1TzB8YN6jiOW0G0xcybxjiQK0hkcrz-RTQ62BuD_L06wqt89D5ESqSe_RTceG_Z82Ss; __Secure-3PSIDCC=AJi4QfG5O5a5KOlvrcxmkrraTwPFcjzqSJRCIdRDL6Ek53p7kDbIFL9uHYWGcR3oZCuv8Rj5Jw' \
  --data-raw 'f.req=%5B%5B%5B%22MkEWBc%22%2C%22%5B%5B%5C%22" + text + "%5C%22%2C%5C%22en%5C%22%2C%5C%22zh-CN%5C%22%2Ctrue%5D%2C%5Bnull%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AD08yZk2hHIuo8PcN1mR6EUgWn50%3A1633195860486&' \
  --compressed";


        //console.log('curlCommand===', curlCommand);
        const output = execSync(curlCommand, { encoding: 'utf-8' });

        const str1 = ',[[\\"';
        const str2 = '\\",';
        const output1 = output.substring(output.indexOf(str1) + str1.length);
        const output2 = output1.substring(0, output1.indexOf(str2));
        return output2;       
    }


    translate4(text: string) {
        text = text.replace(new RegExp('"', 'g'), ' ').replace(new RegExp('&', 'g'), 'and');
        text = encodeURI(text).replace(new RegExp("'", 'g'), "\\\'");
        //text = text.replace(new RegExp('"', 'g'), '\\"').replace(new RegExp("'", 'g'), "\\\'").replace(new RegExp(' ', 'g'), '%20');
        const curlCommand = "curl 'https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=-5957784942741956367&bl=boq_translate-webserver_20210929.09_p0&hl=en&soc-app=1&soc-platform=1&soc-device=2&_reqid=250239&rt=c' \
  -H 'authority: translate.google.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'sec-ch-ua: \"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"' \
  -H 'x-goog-batchexecute-bgr: [\";4f-4_7LQAAbiTIIk4kxfesfOZxiCOrwmACkAIwj8RkeLRg7IjEQ72X6A5NsjwZkFtmf4q9VH_hExfs7YnixfcKjgIh8AAABWTwAAABV1AQcXALpSP7pDkEOC9JuKs_w1nAA-ZkB1cIvBeLG0nnxXbxGJQ6bQvhLYUgbJrVD2s0GBpH1SjDC6YU9wAxhNh1YDAubO_m94qotXJbesPB3b2CkFgrIg_PfqNeo_Kb_aJHzvhosyah9J0QJVP86jIF7cVIXHPorXEi2uOV7JqJOHhrsVFyxm36QUo6awlkuax7Qn-RVyFj58p8r2hh2nArN9lrNKDZSx6D2C9U40xCtzZAHIetMrvcOQ9osHE86EAkxbxe9ur7b0OZkdcURLTEJknA5XLDs6cA7BMFhNDB8IE3C9vxevwTFOqwgx8N8rG-pWoPE_x2BO8fiJhW_WxLDrFdbjqD7o9EySNsGOtle7aOF__iq7zuwbCqCaKHjzk82LRWyLiEnd3x7ya37tUL5-i9Z_CnPondwXyV5ubyET592NkxbIzr3jaiKPhUiWEFwvv0NEsb9pm8iQKJqkEWkZOcmo716tlXVOGue9dp2lo5zUDcpDA9fgT-4gxDPEJ8MLBfXaT9-sRNLec0b1G2iGC9JVWoTyd5VziLDAn-5WXUdsZtzpVgJUkK9QeneCi0czviwyWbEHpY4WmyKxF9geUXNPXrCWs5Lq39-NRQ60IYWHqATAdvn52eVYVY27cB5y7Kxva83AURnrS_lbt4Tp_S3PS0e8hdn-DT1F7hLxoDeYMom6p3VKkMGjdjLDJUbTVRU5ZBdP5U9Q4MFTB0cfhBx0orO0Cmo3etld4LE5xSLd1AnLH-YrHn6QgV913pw-sl9Z90zTROovjOueAN0_34T4cudtt93U4iv88M1aNcwwG7rLYaHUU8DwadI2Eoa3B_Z_MDJcnGPnOOS230MsJByEhZi1fFKB0uzE8PdBWTMdlSbA9Mdf9jUH8OW8fVSr6EHjLAIHPiu2u9wIflXWNWzy-AgSu6KAXAkQbER35DyJMURqbcowky8Xq_D3Xp2SwoO9J9NCPB2r1Zo8MsWUHu38_HXe2EwDzdbDQ7dkLwnzHapH1Y-OCbxnrcxk9nWiM0CwExypAPCQpDs\",null,null,375,null,null,null,0,\"2\"]' \
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
  -H 'cookie: _ga=GA1.3.1927028768.1567101727; CONSENT=YES+CA.en+20180225-07-0; SEARCH_SAMESITE=CgQIypIB; OGPC=19022519-1:19024399-1:19022591-1:19020770-1:19022552-1:19022958-1:; _gid=GA1.3.2086525403.1633053124; OTZ=6179152_72_76_104100_72_446760; HSID=Ajhe4M3H2RYl9OYPB; SSID=AvTTcTu8IUOdiDiDW; APISID=beZY7n9RgsafgiQH/AL4JDyBvj0YoF5-HF; SAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-1PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; __Secure-3PAPISID=cKsLYYrq5q2XzZXo/AGqY630CZWFLCVzgn; SID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyF8Wqyo4ZVFCSgu51dI4srw.; __Secure-1PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KydgulDrv7W2X-Mml1Jsspxw.; __Secure-3PSID=Cgg9YCwIuEsClFJYcF6pkXjK1CmQoXD24xXJce8yHCOjU_KyREdZ-nwyDOwSyLgPAGagsw.; NID=511=nWN6JI1nZO1NtepMiTjFcRQhPjuu10-neX_yPonyjQJTi2AJILtX5kXLTbxOYhRPqEfXs4SbBmh2X6l9wW3qEMJt0mpzcj8PiF3VEctlUtHix-5bklYAvj6zwFX3pJMAggRC4wTfybq_zrK3xowUDci1koxmKeZ76XVminWeOm0BzePuBz85UJWJYwL5mHWdTR7bz53uJSetImy7cmKNcdbLDkYZgFd7XYoV7txqXbFBEtAx-ZgQ6KKJ8jv3g1Y-C2dQx7Tn_hn--iUZVkRamOAFulf189zZl65sVKuM157AHsLBavNd7Mkq8yMXd3puA0G82yU2O5zSYS1pBTCO-a68vmS3x_KOgTapVnhLjx2CkUgsqZoMCIILmG7Rvs24yyA42HARe6tRjeAdAZOC-Y76kfmHzRIS2rwgE_YqesOzsd-FFVjpmn96OLruLffsMoqQP5j51VHX_-b9S2hJqYNy4BJh8rfFde0wnLRTiYJniko; 1P_JAR=2021-10-02-17; SIDCC=AJi4QfEQ6B8aJb8HDhVJxLjXwyKwCfYCNTCDEZBCRiAwHdwXzEpfLvuO25t34W0q2HfnUVlo8NY; __Secure-3PSIDCC=AJi4QfEa5Czt4Ww-H_BqtPLiItcteuSclcvwfO1nfJ7wrFSHPlaje9CAzO6EJbSZyeBDlFdo1w' \
  --data-raw 'f.req=%5B%5B%5B%22MkEWBc%22%2C%22%5B%5B%5C%22" + text + "%5C%22%2C%5C%22en%5C%22%2C%5C%22zh-CN%5C%22%2Ctrue%5D%2C%5Bnull%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AD08yZn0fd91jTRCAg-BYo2tgYvF%3A1633197434498&' \
  --compressed";


        //console.log('curlCommand===', curlCommand);
        const output = execSync(curlCommand, { encoding: 'utf-8' });

console.log('output=', output);
        const str1 = ',[[\\"';
        const str2 = '\\",';
        const output1 = output.substring(output.indexOf(str1) + str1.length);
        const output2 = output1.substring(0, output1.indexOf(str2));
        return output2;   
    }
}



/*

*/