import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IJob {
    name: string,
    namet?: string,
    url: string,
    slug?: string,
    salaryType?: string,
    category: string,
    rawData?: any,
    rawDataParsed?: boolean,
    careerPathData: {
        childCount: number,
        children: [
            {
                value: {
                    jobTitle: string,
                    percent: number
                },
                childCount: number,
                children: [
                    {
                        value: {
                            jobTitle: string,
                            percent: number
                        },
                        childCount: number,
                        children: [
                            {
                                value: {
                                    jobTitle: string,
                                    percent: number
                                }
                            } 
                        ]
                    }                     
                ]
            }            
        ]
    },
    narratives: {
        description: string
    },
    compensation: {
        bonus: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        commission: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        salary: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        hourlyRate: {
            min: number,
            max: number,
            avg: number,
            profileCount: number            
        },
        profitSharing: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        },
        total: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        }
    },  
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            earlyCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            midCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            lateCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            experienced: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            selfDefine: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        healthBenefit: {
            medical: {
                profileCount: number
            },
            dental: {
                profileCount: number
            },
            vision: {
                profileCount: number
            },
            none: {
                profileCount: number
            }
        }
    },
    currencyCode?: string,
    ratings?: {
        overall: {
            profileCount: number,
            score: number
        }
    },
}
export interface Job extends Document {
    name: string,
    namet: string,
    url: string,
    slug: string,
    salaryType: string,
    category: Category,
    rawData: any,
    careerPathData: {
        childCount: number,
        children: [
            {
                value: {
                    jobTitle: string,
                    percent: number
                },
                childCount: number,
                children: [
                    {
                        value: {
                            jobTitle: string,
                            percent: number
                        },
                        childCount: number,
                        children: [
                            {
                                value: {
                                    jobTitle: string,
                                    percent: number
                                }
                            } 
                        ]
                    }                     
                ]
            }            
        ]
    },
    narratives: {
        description: string
    },
    compensation: {
        bonus: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        commission: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        salary: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        hourlyRate: {
            min: number,
            max: number,
            avg: number,
            profileCount: number            
        },
        profitSharing: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        },
        total: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        }
    },  
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            earlyCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            midCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            lateCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            experienced: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            selfDefine: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        healthBenefit: {
            medical: {
                profileCount: number
            },
            dental: {
                profileCount: number
            },
            vision: {
                profileCount: number
            },
            none: {
                profileCount: number
            }
        }
    },
    ratings: {
        overall: {
            profileCount: number,
            score: number
        }
    },
    rawDataParsed: boolean,
    currencyCode: string,
}

const JobSchema = new Schema<Job>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    duplicatedWith: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    currencyCode: String,
    rawDataParsed: Boolean,
    rawData: Object,
    url: String,
    slug: String,
    salaryType: String,
    careerPathData: {
        childCount: Number,
        children: [
            {
                value: {
                    jobTitle: String,
                    percent: Number
                },
                childCount: Number,
                children: [
                    {
                        value: {
                            jobTitle: String,
                            percent: Number
                        },
                        childCount: Number,
                        children: [
                            {
                                value: {
                                    jobTitle: String,
                                    percent: Number
                                }
                            } 
                        ]
                    }                     
                ]
            }            
        ]
    },
    narratives: {
        description: String
    },
    compensation: {
        bonus: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        commission: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        salary: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        hourlyRate: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number            
        },
        profitSharing: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number              
        },
        total: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number              
        }
    },  
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            earlyCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            midCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            lateCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            experienced: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            }
        },
        gender: {
            male: {
              profileCount: Number,
              min: Number,
              max: Number,
              avg: Number
            },
            female: {
              profileCount: Number,
              min: Number,
              max: Number,
              avg: Number
            },
            selfDefine: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            }
        },
        healthBenefit: {
            medical: {
                profileCount: Number
            },
            dental: {
                profileCount: Number
            },
            vision: {
                profileCount: Number
            },
            none: {
                profileCount: Number
            }
        }
    },
    ratings: {
        overall: {
            profileCount: Number,
            score: Number
        }
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    updatedAt: {
        type: Date
    }
});
export const JobModel = model<Job>("Job", JobSchema);