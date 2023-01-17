import React, { useRef, useEffect, useState } from "react";
import { Tabs } from 'antd';
import ReactPrismjs from '@uiw/react-prismjs';
import 'prismjs/components/prism-javascript';
import './css/repoPortrait.css'


const RepoPortrait = () =>{
    const [init, setInit] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        setData(origin_data)
    }, [])

    useEffect(() => {

    }, [data])

    const origin_data = {
        "expressjs/express": {
            "owner": "5658226_expressjs",
            "owner_html_url": "https://github.com/expressjs",
            "owner_type": "Organization",
            "html_url": "https://github.com/expressjs/express",
            "description": "Fast, unopinionated, minimalist web framework for node.",
            "created_at": "2009-06-26T18:56:01Z",
            "updated_at": "2022-07-29T07:39:47Z",
            "size": 9099,
            "topics": ["express", "javascript", "nodejs", "server"],
            "stargazers_count": 57786,
            "watchers_count": 57786,
            "contents_url": "https://api.github.com/repos/expressjs/express/contents/{+path}",
            "language": { "JavaScript": 529055, "Makefile": 330, "Shell": 229 },
            "owner_description": "Express.js: the fast, unopinionated, minimalist web framework for node",
            "howToDo": 1,
            "mergeTopics": [
              "nodejs",
              "framework",
              "read",
              "server",
              "javascript",
              "web",
              "fast",
              "hyperlink",
              "node"
            ]
          }
    }


    function ConnectedRepo({connectionData}){
        return(
        <>
            <ReactPrismjs language="javascript" source= {`const a = "1"\nconst b = 21`} />
        </>
        )
    }

    return(
        <>
            <div id="repo-info">

            </div>
            <div id="connected-repo">
                <Tabs
                    defaultActiveKey="related"
                    items={['related', 'similar'].map((tagType, i) => {
                    return {
                        label: (
                        <span>
                            {tagType === 'related'? <><svg style={{transform: 'translateY(4px)'}} t="1673942435379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2749" width="16" height="16"><path d="M843.676672 360.486912c-9.746432-4.180992-21.11488-8.476672-32.129024-12.416 2.31424-11.836416 4.406272-23.095296 5.341184-34.265088 11.346944-92.941312-7.656448-165.812224-59.1872-196.67456l-1.869824-1.045504c-52.201472-30.394368-125.31712-10.569728-201.101312 46.058496-9.166848 6.764544-17.977344 14.508032-27.255808 21.9392-9.279488-7.431168-17.980416-15.174656-27.25888-21.9392-74.628096-56.027136-147.2768-75.874304-199.832576-46.748672l-1.512448 0.690176c-52.578304 30.394368-72.070144 103.733248-60.811264 197.71904 1.626112 11.169792 3.115008 22.428672 5.4528 34.265088-11.015168 3.939328-21.940224 8.235008-32.487424 12.416-87.020544 37.024768-140.869632 90.604544-140.869632 151.414784 0 60.923904 53.848064 114.302976 140.869632 151.906304 10.546176 4.048896 21.471232 8.23296 32.487424 12.306432-2.337792 11.370496-3.826688 22.962176-5.4528 33.997824-11.25888 94.009344 8.23296 167.079936 61.034496 197.496832 52.800512 30.640128 125.915136 11.148288 201.122816-46.058496 9.279488-6.740992 17.980416-13.927424 27.25888-21.605376 9.279488 7.677952 18.08896 14.864384 27.255808 21.605376 75.784192 57.206784 148.89984 76.698624 201.101312 46.30528l0-0.24576c52.80256-30.416896 72.403968-103.488512 61.057024-197.496832-0.934912-11.035648-3.026944-22.628352-5.341184-33.997824 11.014144-4.073472 22.382592-8.256512 32.129024-12.306432 87.048192-37.603328 140.89216-90.9824 140.89216-151.906304C984.568832 451.091456 930.724864 397.510656 843.676672 360.486912L843.676672 360.486912zM580.498432 196.9664 580.498432 196.9664c61.27616-46.08 118.017024-64.171008 153.971712-43.276288l0.603136 0.222208c35.489792 21.138432 47.92832 78.789632 38.293504 154.79808-0.6912 8.476672-2.313216 17.288192-3.381248 26.011648-38.872064-10.324992-81.329152-18.802688-126.340096-24.1664-27.057152-36.068352-55.581696-69.020672-83.661824-96.877568C566.56896 207.981568 573.889536 202.084352 580.498432 196.9664L580.498432 196.9664zM347.021312 614.834176 347.021312 614.834176l0.466944 1.045504c10.102784 17.068032 19.848192 32.975872 29.950976 48.953344-29.372416-4.983808-57.00608-11.124736-83.217408-17.980416 6.720512-26.32192 15.218688-53.578752 26.211328-81.435648C328.465408 581.880832 337.519616 598.36928 347.021312 614.834176L347.021312 614.834176zM294.2208 377.4208 294.2208 377.4208c26.211328-7.433216 53.844992-13.351936 83.439616-18.225152-10.324992 15.664128-20.0704 32.132096-30.173184 48.864256-9.521152 16.821248-18.80064 33.753088-27.056128 50.240512C309.439488 430.799872 300.941312 403.163136 294.2208 377.4208L294.2208 377.4208zM342.61504 512.124928 342.61504 512.124928c12.439552-27.035648 26.811392-54.892544 42.47552-82.149376 15.6672-27.61216 32.709632-53.470208 49.998848-77.966336 29.617152-2.916352 60.455936-4.4288 92.386304-4.4288 31.906816 0 62.903296 1.512448 92.494848 4.4288 17.155072 24.496128 34.22208 50.354176 49.887232 77.966336l0.79872 1.045504c15.442944 27.0336 29.372416 54.068224 41.653248 80.879616-12.52352 27.25888-26.65472 54.784-42.697728 82.172928l-0.46592 0.666624c-15.44192 27.300864-32.24064 53.046272-49.174528 77.298688-29.591552 2.557952-60.588032 4.629504-92.494848 4.629504-31.930368 0-62.769152-2.070528-92.386304-4.629504-17.288192-24.475648-34.330624-50.463744-49.998848-77.966336l-0.487424-1.068032C368.847872 565.861376 355.054592 538.602496 342.61504 512.124928L342.61504 512.124928zM706.392064 617.16992 706.392064 617.16992l1.42336-1.291264c9.280512-16.733184 18.424832-33.997824 26.65472-50.46272 10.927104 27.856896 19.627008 55.113728 26.012672 81.435648-25.409536 6.854656-53.736448 12.995584-83.10784 17.980416C687.388672 649.411584 696.891392 633.413632 706.392064 617.16992L706.392064 617.16992zM708.25984 408.859648 708.25984 408.859648l-0.44544-0.799744c-9.877504-16.73216-20.204544-33.199104-30.440448-48.864256 29.372416 4.873216 57.698304 10.791936 83.10784 18.225152-6.385664 25.74336-15.085568 53.379072-26.012672 80.879616C726.240256 442.41408 717.31712 425.570304 708.25984 408.859648L708.25984 408.859648zM527.474688 242.58048 527.474688 242.58048c19.600384 18.557952 38.647808 40.163328 57.20576 63.347712-18.557952-1.624064-37.6064-1.624064-57.20576-1.624064-19.49184 0-38.540288 0-57.428992 1.624064C489.179136 282.743808 508.205056 261.138432 527.474688 242.58048L527.474688 242.58048zM320.431104 153.689088 320.431104 153.689088l1.068032-0.466944c36.535296-19.825664 92.251136-1.84832 152.94976 43.743232 6.720512 5.117952 13.930496 11.016192 20.873216 16.71168-28.54912 27.856896-56.962048 60.81024-84.243456 96.877568-45.011968 5.362688-87.266304 13.841408-125.893632 24.1664-1.73568-8.723456-2.803712-17.536-3.849216-26.011648C272.059392 232.700928 284.474368 174.560256 320.431104 153.689088L320.431104 153.689088zM253.010944 633.413632 253.010944 633.413632c-8.675328-3.383296-17.043456-6.163456-24.695808-9.745408-70.580224-30.396416-114.658304-69.645312-114.658304-111.767552 0-41.76384 44.07808-81.458176 114.658304-111.496192 7.653376-3.381248 16.464896-6.519808 24.695808-10.102784 10.34752 39.205888 24.254464 79.835136 42.276864 121.598976C277.265408 554.023936 263.358464 594.295808 253.010944 633.413632L253.010944 633.413632zM474.44992 826.728448 474.44992 826.728448c-61.27616 46.190592-117.438464 64.171008-154.017792 43.522048-35.95776-20.537344-48.372736-78.456832-39.094272-154.932224 1.045504-8.209408 2.113536-17.289216 3.849216-26.322944 38.627328 10.790912 80.881664 19.136512 125.893632 24.254464 27.281408 36.535296 55.693312 69.511168 84.243456 97.011712C488.379392 816.1792 481.170432 821.874688 474.44992 826.728448L474.44992 826.728448zM527.474688 781.248512 527.474688 781.248512c-19.269632-18.581504-38.295552-39.918592-57.428992-63.371264 18.888704 1.512448 37.936128 2.091008 57.428992 2.091008 19.600384 0 38.647808-0.57856 57.20576-2.091008C566.122496 741.328896 547.075072 762.665984 527.474688 781.248512L527.474688 781.248512zM734.470144 870.250496 734.470144 870.250496c-35.954688 20.64896-92.695552 2.668544-153.971712-43.165696-6.607872-5.209088-13.929472-10.904576-20.514816-16.823296 28.080128-27.500544 56.604672-60.47744 83.661824-97.011712 45.010944-5.116928 87.468032-13.462528 126.340096-24.254464 1.068032 9.033728 2.690048 18.113536 3.381248 26.322944C783.000576 791.79264 770.563072 849.713152 734.470144 870.250496L734.470144 870.250496zM826.744832 623.669248 826.744832 623.669248c-7.76704 3.581952-16.265216 6.362112-24.721408 9.745408-10.10176-39.117824-24.25344-79.389696-42.22976-121.288704 17.977344-41.987072 32.128-82.61632 42.22976-121.822208 8.456192 3.582976 16.954368 6.720512 24.721408 10.102784 70.556672 30.036992 114.302976 69.732352 114.302976 111.496192C941.047808 554.023936 897.301504 593.272832 826.744832 623.669248L826.744832 623.669248z" fill="#231815" p-id="2750"></path></svg>
                            &nbsp;{tagType}</>: <><svg style={{transform: 'translateY(4px)'}} t="1673943119057" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3312" width="16" height="16"><path d="M823.854545 800.581818c83.781818-83.781818 134.981818-200.145455 134.981819-330.472727 0-260.654545-209.454545-470.109091-465.454546-470.109091S32.581818 209.454545 32.581818 470.109091s209.454545 470.109091 460.8 470.109091c102.4 0 195.490909-32.581818 274.618182-93.090909l172.218182 176.872727 51.2-51.2-167.563637-172.218182z m-330.472727 65.163637c-214.109091 0-390.981818-176.872727-390.981818-395.636364S279.272727 74.472727 493.381818 74.472727c214.109091 0 390.981818 176.872727 390.981818 395.636364s-176.872727 395.636364-390.981818 395.636364z" p-id="3313"></path><path d="M623.709091 577.163636v-279.272727c0-18.618182-13.963636-27.927273-27.927273-27.927273h-279.272727c-18.618182 0-27.927273 13.963636-27.927273 27.927273v274.618182c0 18.618182 13.963636 27.927273 27.927273 27.927273h279.272727c13.963636 4.654545 27.927273-9.309091 27.927273-23.272728z m-60.509091-32.581818H344.436364V330.472727h218.763636v214.109091z" p-id="3314"></path><path d="M651.636364 633.018182h-172.218182v60.509091h204.8c18.618182 0 27.927273-13.963636 27.927273-27.927273V456.145455H651.636364v176.872727z" p-id="3315"></path></svg>
                            &nbsp;{tagType}</>}
                            
                        </span>
                        ),
                        key: tagType,
                        children: <ConnectedRepo connectionData={i}/>,
                    };
                    })}
                />
                {/* <div id="related-repo">
                    <div className="connected-repo-title">related repository</div>
                </div>
                <div id="similar-repo">
                    <div className="connected-repo-title">similar repository</div>
                </div> */}
            </div>
        </>
    )
}

export default RepoPortrait