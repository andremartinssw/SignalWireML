import YAML from 'yaml';
import { Section } from "./Section";

type Cond = {
    cond: {
        when: string;
        then: Section;
        default: Section;
    };
};

type Execute = {
    execute: {
        dest: string;
        params?: { [key: string]: any };
        on_return?: Section;
    };
};

type Goto = {
    goto: {
        label: string;
        when?: string;
        max?: number;
        meta?: { [key: string]: any }
    };
};

type Request = {
    request: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        headers?: { [key: string]: any };
        body?: string | { [key: string]: any };
        timeout?: number;
        connect_timeout?: number;
        save_variables?: boolean;
    };
};

type Return = {
    "return": { [key: string]: any };
};

type Set = {
    set: { [key: string]: any };
};

type Switch = {
    'switch': {
        variable: string;
        case?: { [key: number]: Section };
        default?: Section
    };
};

type Transfer = {
    transfer: {
        dest: string;
        params?: { [key: string]: any };
        meta?: { [key: string]: any };
    };
};

type Unset = {
    unset: { 
        vars: string | string[]
    };
};

type AI = {
    ai: {
        voice?: string;
        prompt?: AIPrompt;
        post_prompt?: AIPostPrompt;
        post_prompt_url?: string;
        post_prompt_auth_user?: string;
        post_prompt_auth_password?: string;
        params?: AIParams;
        SWAIG?: SWAIG;
        hints?: string[];
        languages?: { name: string; code: string; voice?: string }[];
    };
};

type AIParams = {
    direction?: "inbound" | "outbound";
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
}

type AIPrompt = {
    text?: string;
    temperature?: number;
    top_p?: number;
    confidence?: number;
    barge_confidence?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
};

type AIPostPrompt = {
    text?: string;
    temperature?: number;
    top_p?: number;
    confidence?: number;
    barge_confidence?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
};

type Answer = "answer" | {
    answer: {
        max_duration?: number
    }
}

type Connect = {
    connect: {
        destination?: string;
        from?: string;
        headers?: { [key: string]: any };
        codecs?: string;
        webrtc_media?: boolean;
        session_timeout?: number;
        ringback?: string[];
    };
};

type Denoise = {
    denoise: {
        [key: string]: any;
    };
};

type Hangup = {
    hangup: {
        reason?: "hangup" | "busy" | "decline"
    }
}

type JoinRoom = {
    join_room: {
        name: string;
    }
}

type Play = {
    play: {
        url?: string;
        urls?: string[];
        volume?: number;
        say_voice?: string;
        say_language?: string;
        say_gender?: string;
    };
};

type Prompt = {
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
        result?
    }
}

type PromptSwitch = {
    case?: { [key: number]: Section };
    default?: Section
}

type PromptCond = {
    when: string;
    then: Section;
    default: Section;
}

type ReceiveFax = {
    receive_fax: {
        [key: string]: any;
    };
};

type Record = {
    record: {
        stereo?: boolean;
        format?: "wav" | "mp3";
        direction?: "speak" | "hear";
        terminators?: string;
        beep?: boolean;
        input_sensitivity?: number;
        initial_timeout?: number;
        end_silence_timeout?: number;
    }
}

type RecordCall = {
    record_call: {
        control_id?: string;
        stereo?: boolean;
        format?: string;
        direction?: 'speak' | 'hear' | 'both';
        terminators?: string;
        beep?: boolean;
        input_sensitivity?: number;
        initial_timeout?: number;
        end_silence_timeout?: number;
    };
};

type SendDigits = {
    send_digits: {
        digits: string;
    };
};

type SendFax = {
    send_fax: {
        document: string;
        header_info?: string;
        identity?: string;
    };
};

type SendSMS = {
    send_sms: {
        to_number: string;
        from_number: string;
        body?: string;
        media?: string[];
        region?: string;
        tags?: string[];
    };
};

type SIPRefer = {
    sip_refer: {
        to_uri: string;
    };
};

type StopDenoise = {
    stop_denoise: {
        [key: string]: any;
    };
};

type StopRecordCall = {
    stop_record_call: {
        control_id?: string;
    };
};

type StopTap = {
    stop_tap: {
        control_id?: string;
    };
};

type SWAIG = {
    defaults?: {
        web_hook_url?: string;
        web_hook_auth_user?: string;
        web_hook_auth_password?: string;
        meta_data?: { [key: string]: any };
        meta_data_token?: string;
    };
    native_functions?: string[];
    includes?: [ { [key: string]: any } ];
    functions?: {
        'function': string;
        web_hook_url?: string;
        web_hook_auth_user?: string;
        web_hook_auth_pass?: string;
        purpose: string;
        argument: {
            type: string | { [ key: string ]: any };
            properties: { [ key: string ]: any }
        };
    }[];
};

type Tap = {
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
    | Tap;

export class SignalWireML {
    private sections: { [key: string]: any[] };

    constructor() {
        this.sections = {};
    }

    addSection(name: string): Section {
        const section = new Section();
        this.sections[name] = section.getActions();
        return section;
    }

    toJSON(): string {
        return JSON.stringify({ sections: this.sections }, null, 4);
    }

    toYAML(): string {
        return YAML.stringify({ sections: this.sections })
    }
}
