
export type Cond = {
    cond: {
        when: string;
        then: Instruction[];
        else: Instruction[];
    };
};

export type Execute = {
    execute: {
        dest: string;
        params?: { [key: string]: any };
        meta?: { [key: string]: any };
        on_return?: Instruction[];
    };
};

export type Goto = {
    goto: {
        label: string;
        when?: string;
        max?: number;
        meta?: { [key: string]: any };
    };
};

export type Request = {
    request: {
        url: string;
        method: RequestMethod//"GET" | "POST" | "PUT" | "DELETE";
        headers?: { [key: string]: any };
        body?: string | { [key: string]: any };
        timeout?: number;
        connect_timeout?: number;
        //result?: Cond | Switch | Array<Cond | Switch>; // TODO: Add ResultElement type once result is implemented
        save_variables?: boolean;
    };
};

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";


export type Return =
    "return" | {
    return: string | { [key: string]: any };
};

export type Set = {
    set: { [key: string]: any };
};

export type Switch = {
    switch: {
        variable: string;
        case?: { [key: string]: Instruction[]; };
        default?: Instruction[];
    };
};

export type Transfer = {
    transfer: {
        dest: string;
        params?: { [key: string]: any };
        meta?: { [key: string]: any };
       //result?: Cond | Switch | Array<Cond | Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

export type Unset = {
    unset: {
        vars: string | string[];
    };
};

export type AI = {
    ai: {
        prompt?: AIPrompt;
        post_prompt?: AIPrompt;
        post_prompt_url?: string;
        post_prompt_auth_user?: string;
        post_prompt_auth_password?: string;
        params?: AIParams;
        SWAIG?: SWAIG;
        hints?: string[];
        languages?: AILanguage[];
        pronounce?: AIPronounce[];
    };
};

export type AIPronounce = {
    replace: string;
    with: string;
    ignore_case?: boolean;
};

export type AILanguage = {
    name: string;
    code: string;
    voice?: string;
};

export type AIParams = {
    direction?: AIDirection //"inbound" | "outbound";
    wait_for_user?: boolean;
    end_of_speech_timeout?: number;
    attention_timeout?: number;
    inactivity_timeout?: number;
    background_file?: string;
    background_file_loops?: number;
    background_file_volume?: number;
    ai_volume?: number;
    local_tz?: string;
    conscience?: boolean;
    save_conversation?: boolean;
    conversation_id?: string;
    digit_timeout?: number;
    digit_terminators?: string;
    energy_level?: number;
    swaig_allow_swml?: boolean;
};

export type AIDirection = "inbound" | "outbound";


export type AIPrompt = {
    text?: string;
    temperature?: number;
    top_p?: number;
    confidence?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    //result?: Cond | Switch | Array<Cond | Switch>; // TODO: Add ResultElement type once result is implemented
};

export type Answer =
    "answer"
    | {
          answer: {
              max_duration?: number;
          };
      };

export type Connect = {
    connect: {
        from?: string;
        headers?: { [key: string]: any };
        codecs?: string;
        webrtc_media?: boolean;
        session_timeout?: number;
        ringback?: string[];
        timeout?: number;
        max_duration?: number;
        answer_on_bridge?: boolean;
        call_state_url?: string;
        call_state_events?: string[];
        // result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

export type Denoise =
    "denoise" | {
    denoise: {
        [key: string]: any;
    };
};

export type Hangup =
    "hangup" | {
    hangup: {
        reason?: HangupReason
    };
};

export type HangupReason = "hangup" | "busy" | "decline";


export type JoinRoom = {
    join_room: {
        name: string;
    };
};

export type Play = {
    play: {
        url?: string;
        urls?: string[];
        volume?: number;
        say_voice?: string;
        say_language?: string;
        say_gender?: string;
    };
};

export type Prompt = {
    prompt: {
        play: string | string[];
        volume?: number;
        say_voice?: string;
        say_language?: string;
        say_gender?: string;
        max_digits?: number;
        terminators?: string;
        digit_timeout?: number;
        initial_timeout?: number;
        speech_timeouit?: number;
        speech_end_timeout?: number;
        speech_language?: string;
        speech_hints?: string[];
        //result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

export type ReceiveFax =
    "receive_fax" |
    {
    receive_fax: {
        [key: string]: any;
    };
};

export type Record =
    "record" | {
    record: {
        stereo?: boolean;
        format?: RecordFormat //"wav" | "mp3";
        direction?: RecordAudioDirection //"speak" | "listen";
        terminators?: string;
        beep?: boolean;
        input_sensitivity?: number;
        initial_timeout?: number;
        end_silence_timeout?: number;
    };
};

export type RecordAudioDirection = "speak" | "listen";

export type RecordFormat = "wav" | "mp3";


export type RecordCall = {
    record_call: {
        control_id?: string;
        stereo?: boolean;
        format?: RecordFormat //"wav" | "mp3";
        direction?: RecordCallAudioDirection //"speak" | "listen" | "both";
        terminators?: string;
        beep?: boolean;
        input_sensitivity?: number;
        initial_timeout?: number;
        end_silence_timeout?: number;
    };
};

export type RecordCallAudioDirection = "speak" | "listen" | "both";



export type SendDigits = {
    send_digits: {
        digits: string;
    };
};

export type SendFax = {
    send_fax: {
        document: string;
        header_info?: string;
        identity?: string;
    };
};

export type SendSMS = {
    send_sms: {
        to_number: string;
        from_number: string;
        body?: string;
        media?: string[];
        region?: string;
        tags?: string[];
    };
};

export type SIPRefer = {
    sip_refer: {
        to_uri: string;
        // result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

export type StopDenoise =
    "stop_denoise" | {
    stop_denoise: {
        [key: string]: any;
    };
};

export type StopRecordCall =
    "stop_record_call"
    | {
    stop_record_call: {
        control_id?: string;
    };
};

export type StopTap =
    "stop_tap"
    | {
    stop_tap: {
        control_id?: string;
    };
};

export type SWAIG = {
    defaults?: WebHookDefaults;
    includes?: { [key: string]: any }[];
    functions?: FunctionConfig[];
};

type WebHookDefaults = {
    web_hook_url?: string;
    web_hook_auth_user?: string;
    web_hook_auth_password?: string;
};

type FunctionConfig = {
    active?: boolean;
    function: string;
    meta_data?: FunctionMetaData[];
    meta_data_token?: string;
    data_map: DataMap[];
    web_hook_url?: string;
    web_hook_auth_user?: string;
    web_hook_auth_pass?: string;
    purpose: string;
    argument: FunctionArgument;
};

type FunctionMetaData = {
    name: string;
    code: string;
    voice?: string;
};

type DataMap = {
    expressions: Expression[];
    webhooks: WebhookConfig;
};

type Expression = {
    string: string;
    pattern: string;
    output: ExpressionOutput;
};

type ExpressionOutput = {
    response: string;
    action: { [key: string]: any }[];
};

type WebhookConfig = {
    url: string;
    headers: { [key: string]: any };
    method: RequestMethod//"GET" | "POST" | "PUT" | "DELETE"
    output: WebhookOutput;
};

type WebhookOutput = {
    action: Instruction[];
    response: string;
};


type FunctionArgument = {
    type: string | { [key: string]: any };
    properties: { [key: string]: any };
};


export type Tap = {
    tap: {
        uri: string;
        control_id?: string;
        direction?: string;
        codec?: string;
        rtp_ptime?: number;
    };
};

export type Instruction =
    | Cond
    | Execute
    | Goto
    | Request
    | Return
    | Set
    | Switch
    | Transfer
    | Unset
    | AI
    | Answer
    | Connect
    | Denoise
    | Hangup
    | JoinRoom
    | Play
    | Prompt
    | ReceiveFax
    | Record
    | RecordCall
    | SendDigits
    | SendFax
    | SendSMS
    | SIPRefer
    | StopDenoise
    | StopRecordCall
    | StopTap
    | Tap