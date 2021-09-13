import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../../daos/countryDao";

export const start = async function() {
    const dao = new CountryDao();
    const countries = await dao.fetchAll();
    for(let i = 0; i < countries.length; i++) {
       try {
        const country = countries[i];
        const countryName = country.name;
        const url = country.url;
        if(!url) {
            console.log('error, url is empty');
        }
        const response = await fetch('https://www.payscale.com' + url);

        const body = await response.text();
        
        const root = parse(body);
    
        const nextDataNode = root.querySelector('#__NEXT_DATA__');
    
        if(!nextDataNode) {
            continue;
        }
        
        const dataText = nextDataNode.text;
        //console.log('dataText=', dataText);
        const data = parseData(dataText);
        //console.log('data=', data);
        const newCoutry = await dao.update(country._id, data);
        //console.log('newSchool=', newSchool);
      } catch(e: any) {
         i --;
      }
    }
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);
    
    /*
    const byDimension = json.props.pageProps.pageData.byDimension;
    
    console.log('byDimension=', byDimension);
    const jobs = byDimension['Average Salary by Job']['rows'];
    const employers = byDimension['Average Salary by Employer']['rows'];
    const degrees = byDimension['Average Salary by Degree']['rows'];
    const schools = byDimension['Average Salary by School']['rows'];
    */

    return {
       rawData: json
    }
}


/*
{
   "props":{
      "pageProps":{
         "ratings":{
            "Dyncorp International":{
               "Appreciation":{
                  "profileCount":4,
                  "score":4.5
               },
               "Company Outlook":{
                  "profileCount":4,
                  "score":4.25
               },
               "Fair Pay":{
                  "profileCount":4,
                  "score":2.75
               },
               "Learning and Development":{
                  "profileCount":4,
                  "score":4.5
               },
               "Manager Communication":{
                  "profileCount":5,
                  "score":3.6
               },
               "Manager Relationship":{
                  "profileCount":4,
                  "score":4
               },
               "Overall Employee Satisfaction":{
                  "profileCount":5,
                  "score":4.6
               },
               "Pay Transparency":{
                  "profileCount":4,
                  "score":3.75
               }
            },
            "GardaWorld":{
               "Appreciation":{
                  "profileCount":2,
                  "score":4.5
               },
               "Company Outlook":{
                  "profileCount":2,
                  "score":4.5
               },
               "Fair Pay":{
                  "profileCount":2,
                  "score":3
               },
               "Learning and Development":{
                  "profileCount":2,
                  "score":4.5
               },
               "Manager Communication":{
                  "profileCount":2,
                  "score":5
               },
               "Manager Relationship":{
                  "profileCount":2,
                  "score":4.5
               },
               "Overall Employee Satisfaction":{
                  "profileCount":2,
                  "score":4.5
               },
               "Pay Transparency":{
                  "profileCount":2,
                  "score":4.5
               }
            },
            "Fluor Corporation":null,
            "Aga Khan Foundation":null
         },
         "countryCategories":[
            {
               "text":"Employer",
               "url":"/research/AF/Employer"
            },
            {
               "text":"Degree / Major Subject",
               "url":"/research/AF/Degree"
            },
            {
               "text":"Job",
               "url":"/research/AF/Job"
            },
            {
               "text":"Certification",
               "url":"/research/AF/Certification"
            },
            {
               "text":"Skill / Specialty",
               "url":"/research/AF/Skill"
            },
            {
               "text":"Industry",
               "url":"/research/AF/Industry"
            },
            {
               "text":"State / Province / City",
               "url":"#state-section"
            }
         ],
         "siteUrl":"https://www.payscale.com",
         "pageData":{
            "country":"AF",
            "category":"Country",
            "dimensions":{
               "country":"Afghanistan"
            },
            "multiDimensional":false,
            "reportType":"Salary",
            "refs":{
               "url":"/research/AF/Country=Afghanistan/Salary",
               "defaultUrl":"/research/AF/Country=Afghanistan/Salary",
               "parentUrl":null
            },
            "currencyCode":"AFA",
            "lastUpdated":"2021-08-29T17:26:22.24948Z",
            "narratives":null,
            "tasks":null,
            "compensation":{
               "bonus":{
                  "10":100.19,
                  "25":953.59,
                  "50":3017.58,
                  "75":9787.14,
                  "90":15635.78,
                  "profileCount":77
               },
               "hourlyRate":{
                  "10":7.59,
                  "25":11,
                  "50":19.52,
                  "75":26.49,
                  "90":46.33,
                  "profileCount":45
               },
               "profitSharing":{
                  "10":25.53,
                  "25":297.48,
                  "50":1300,
                  "75":14739.53,
                  "90":48935.7,
                  "profileCount":12
               },
               "salary":{
                  "10":13835.82,
                  "25":23977.51,
                  "50":53881.75,
                  "75":92749.73,
                  "90":135197.74,
                  "profileCount":243
               },
               "total":{
                  "10":14664.42,
                  "25":24294.55,
                  "50":51006.05,
                  "75":92301.68,
                  "90":136753.76,
                  "profileCount":288
               }
            },
            "byDimension":{
               "Average Hourly Rate by Employer":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":17,
                  "description":"Median Hourly Rate by Employer Name",
                  "rows":[
                     {
                        "name":"Dyncorp International",
                        "displayName":null,
                        "url":"/research/AF/Employer=Dyncorp_International/Salary",
                        "profileCount":3,
                        "range":{
                           "50":15.06
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Vectrus",
                        "displayName":null,
                        "url":"/research/AF/Employer=Vectrus/Hourly_Rate",
                        "profileCount":2,
                        "range":{
                           "50":28.57
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     }
                  ],
                  "parentUrl":null
               },
               "Average Hourly Rate by Employer Type":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":24,
                  "description":"Median Hourly Rate by Employer Type",
                  "rows":[
                     {
                        "name":"Company",
                        "displayName":null,
                        "url":null,
                        "profileCount":14,
                        "range":{
                           "10":4.1,
                           "25":15.4,
                           "50":25.49,
                           "75":39.17,
                           "90":51.75
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Contract",
                        "displayName":null,
                        "url":null,
                        "profileCount":5,
                        "range":{
                           "25":14.03,
                           "50":20,
                           "75":21.25
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Government - Federal",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":28.5
                        },
                        "isEstimated":true
                     },
                     {
                        "name":"Hospital",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":8
                        },
                        "isEstimated":true
                     }
                  ],
                  "parentUrl":null
               },
               "Average Hourly Rate by Job":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":45,
                  "description":"Median Hourly Rate by Job",
                  "rows":[
                     {
                        "name":"Food Service Worker",
                        "displayName":null,
                        "url":"/research/AF/Job=Food_Service_Worker/Hourly_Rate",
                        "profileCount":3,
                        "range":{
                           "50":7
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Armed Security Guard",
                        "displayName":null,
                        "url":"/research/AF/Job=Armed_Security_Guard/Salary",
                        "profileCount":2,
                        "range":{
                           "50":158.5
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Civil Engineer",
                        "displayName":null,
                        "url":"/research/AF/Job=Civil_Engineer/Salary",
                        "profileCount":2,
                        "range":{
                           "50":18.5
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Forklift Operator",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":15.48
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     }
                  ],
                  "parentUrl":null
               },
               "Average Salary By Degree Major":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":30,
                  "description":"Median Salary by Degree/Major Subject",
                  "rows":[
                     {
                        "name":"Bachelor of Arts (BA)",
                        "displayName":"Bachelor of Arts (BA)",
                        "url":"/research/AF/Degree=Bachelor_of_Arts_(BA)/Salary",
                        "profileCount":3,
                        "range":{
                           "50":60000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Bachelor of Science (BS / BSc)",
                        "displayName":"Bachelor of Science (BS / BSc)",
                        "url":"/research/AF/Degree=Bachelor_of_Science_(BS_%2F_BSc)/Salary",
                        "profileCount":3,
                        "range":{
                           "50":60000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Bachelor of Science (BS / BSc), Computer Science (CS)",
                        "displayName":"Bachelor of Science (BS / BSc), Computer Science (CS)",
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":55500
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Master of Business Administration (MBA)",
                        "displayName":"Master of Business Administration (MBA)",
                        "url":"/research/AF/Degree=Master_of_Business_Administration_(MBA)/Salary",
                        "profileCount":2,
                        "range":{
                           "50":80000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Master of Engineering (MEng / ME)",
                        "displayName":"Master of Engineering (MEng / ME)",
                        "url":"/research/AF/Degree=Master_of_Engineering_(MEng_%2F_ME)/Salary",
                        "profileCount":2,
                        "range":{
                           "50":60500
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     }
                  ],
                  "parentUrl":null
               },
               "Average Salary by Employer":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":79,
                  "description":"Median Salary by Employer Name",
                  "rows":[
                     {
                        "name":"Dyncorp International",
                        "displayName":null,
                        "url":"/research/AF/Employer=Dyncorp_International/Salary",
                        "profileCount":6,
                        "range":{
                           "25":17687.43,
                           "50":54982.5,
                           "75":122083.78
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"GardaWorld",
                        "displayName":null,
                        "url":"/research/AF/Employer=GardaWorld/Salary",
                        "profileCount":6,
                        "range":{
                           "25":69937.65,
                           "50":87000,
                           "75":111910.13
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Fluor Corporation",
                        "displayName":null,
                        "url":"/research/AF/Employer=Fluor_Corporation/Salary",
                        "profileCount":4,
                        "range":{
                           "50":88000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"AAR Corporation",
                        "displayName":null,
                        "url":"/research/AF/Employer=AAR_Corporation/Salary",
                        "profileCount":2,
                        "range":{
                           "50":86300
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Aga Khan Foundation",
                        "displayName":null,
                        "url":"/research/AF/Employer=Aga_Khan_Foundation/Salary",
                        "profileCount":2,
                        "range":{
                           "50":51500
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Caci International Inc",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":80000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Leidos",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":128500
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Save The Children",
                        "displayName":null,
                        "url":"/research/AF/Employer=Save_The_Children/Salary",
                        "profileCount":2,
                        "range":{
                           "50":32700
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"U.S. Army",
                        "displayName":null,
                        "url":"/research/AF/Employer=U.S._Army/Salary",
                        "profileCount":2,
                        "range":{
                           "50":65000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     }
                  ],
                  "parentUrl":null
               },
               "Average Salary by Employer Type":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":143,
                  "description":"Median Salary by Employer Type",
                  "rows":[
                     {
                        "name":"Company",
                        "displayName":null,
                        "url":null,
                        "profileCount":57,
                        "range":{
                           "10":11091.82,
                           "25":18953.28,
                           "50":50868.24,
                           "75":87076.86,
                           "90":137960.53
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Contract",
                        "displayName":null,
                        "url":null,
                        "profileCount":30,
                        "range":{
                           "10":30201.21,
                           "25":68047.44,
                           "50":94844.27,
                           "75":103497.03,
                           "90":129128.1
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Government - Federal",
                        "displayName":null,
                        "url":null,
                        "profileCount":16,
                        "range":{
                           "10":24467.85,
                           "25":59495.24,
                           "50":74874.17,
                           "75":127523.07,
                           "90":204257.19
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Non-Profit Organization",
                        "displayName":null,
                        "url":null,
                        "profileCount":13,
                        "range":{
                           "10":13807.63,
                           "25":17194.01,
                           "50":26691.5,
                           "75":51000,
                           "90":116349.6
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Military",
                        "displayName":null,
                        "url":null,
                        "profileCount":7,
                        "range":{
                           "25":40000,
                           "50":78762.68,
                           "75":90000
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Private Practice/Firm",
                        "displayName":null,
                        "url":null,
                        "profileCount":6,
                        "range":{
                           "25":36302.86,
                           "50":114500,
                           "75":152563.49
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Other Organization",
                        "displayName":null,
                        "url":null,
                        "profileCount":5,
                        "range":{
                           "25":18104,
                           "50":21000,
                           "75":39500
                        },
                        "isEstimated":false
                     },
                     {
                        "name":"Government - State \u0026 Local",
                        "displayName":null,
                        "url":null,
                        "profileCount":4,
                        "range":{
                           "50":18000
                        },
                        "isEstimated":true
                     },
                     {
                        "name":"College / University",
                        "displayName":null,
                        "url":null,
                        "profileCount":2,
                        "range":{
                           "50":75000
                        },
                        "isEstimated":true
                     }
                  ],
                  "parentUrl":null
               },
               "Average Salary by Job":{
                  "lastUpdated":"2021-08-29T17:26:22.24948Z",
                  "profileCount":243,
                  "description":"Median Salary by Job",
                  "rows":[
                     {
                        "name":"Intelligence Analyst",
                        "displayName":null,
                        "url":"/research/AF/Job=Intelligence_Analyst/Salary",
                        "profileCount":9,
                        "range":{
                           "25":54000,
                           "50":88509.81,
                           "75":94497.36
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Civil Engineer",
                        "displayName":null,
                        "url":"/research/AF/Job=Civil_Engineer/Salary",
                        "profileCount":7,
                        "range":{
                           "25":15000,
                           "50":25434.12,
                           "75":80000
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Armed Security Guard",
                        "displayName":null,
                        "url":"/research/AF/Job=Armed_Security_Guard/Salary",
                        "profileCount":7,
                        "range":{
                           "25":60000,
                           "50":72887.65,
                           "75":100000
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Logistics Coordinator",
                        "displayName":null,
                        "url":"/research/AF/Job=Logistics_Coordinator/Salary",
                        "profileCount":6,
                        "range":{
                           "25":44808.16,
                           "50":87000,
                           "75":152604.72
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Security Guard",
                        "displayName":null,
                        "url":"/research/AF/Job=Security_Guard/Salary",
                        "profileCount":6,
                        "range":{
                           "25":39305.41,
                           "50":50250,
                           "75":66128.71
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Project Coordinator, (Unknown Type / General)",
                        "displayName":null,
                        "url":"/research/AF/Job=Project_Coordinator%2C_(Unknown_Type_%2F_General)/Salary",
                        "profileCount":5,
                        "range":{
                           "25":17550,
                           "50":43000,
                           "75":180000
                        },
                        "isEstimated":false,
                        "type":"hourly_rate"
                     },
                     {
                        "name":"Project Manager, (Unspecified Type / General)",
                        "displayName":null,
                        "url":"/research/AF/Job=Project_Manager%2C_(Unspecified_Type_%2F_General)/Salary",
                        "profileCount":4,
                        "range":{
                           "50":40000
                        },
                        "isEstimated":true,
                        "type":"hourly_rate"
                     }
                  ],
                  "parentUrl":null
               }
            },
            "ratings":null,
            "related":null,
            "benefits":null,
            "comparisons":null,
            "locations":{
               "total":4,
               "data":[
                  {
                     "location":{
                        "city":"Bagram",
                        "state":null,
                        "country":"AF"
                     },
                     "url":"/research/AF/Location=Bagram/Salary"
                  },
                  {
                     "location":{
                        "city":"Jalalabad",
                        "state":null,
                        "country":"AF"
                     },
                     "url":"/research/AF/Location=Jalalabad/Salary"
                  },
                  {
                     "location":{
                        "city":"Kabul",
                        "state":null,
                        "country":"AF"
                     },
                     "url":"/research/AF/Location=Kabul/Salary"
                  },
                  {
                     "location":{
                        "city":"Kandahar",
                        "state":null,
                        "country":"AF"
                     },
                     "url":"/research/AF/Location=Kandahar/Salary"
                  }
               ]
            },
            "occupationalDetails":null
         },
         "paginationProps":{
            "urlFormat":"/research/AF/Country=Afghanistan/Salary/Page-{page}",
            "activePage":1,
            "pageSize":7,
            "totalItems":169,
            "specialUrlFormats":{
               "1":"/research/AF/Country=Afghanistan/Salary"
            }
         }
      },
      "__N_SSP":true
   },
   "page":"/location/country",
   "query":{
      
   },
   "buildId":"app",
   "assetPrefix":"https://cdn-payscale.com/content/research-center-web/prod/2021.0902.1741.288-master",
   "isFallback":false,
   "gssp":true,
   "customServer":true
}
*/