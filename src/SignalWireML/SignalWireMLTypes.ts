/**
 * @title Instruction
 * @description This type defines the SignalWireML instructions.
*/

export type Instruction =
    | Cond
    | Execute
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

/**
 * @title RequestMethod
 * @description This type defines the HTTP request method.
 * @enum {string}
 * @const {string} GET - Represents an HTTP GET request.
 * @const {string} POST - Represents an HTTP POST request.
 * @const {string} PUT - Represents an HTTP PUT request.
 * @const {string} DELETE - Represents an HTTP DELETE request.
 */
export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

/**
 * @title Cond
 * @description Execute a sequence of instructions depending on the value of a JavaScript condition.
 */
export type Cond = {
    /**
     * @property cond
     * @description Defines the cond structure
     */
    cond: {
        /**
         * @property  when
         * @description The condition to be evaluated and act on.
         */
        when: string;
        /**
         * @property  then
         * @description The list of SWML instructions to be executed if the condition is true
         */
        then: Instruction[];
        /**
         * @property  else
         * @description The list of SWML instructions to be executed if the condition is false
         */
        else: Instruction[];
    };
};

/**
 * @title Execute
 * @description Execute a section or URL as a subroutine and return back to current document.
 */
export type Execute = {

    /**
     * @property execute
     * @description Defines the execute structure
     */
    execute: {
        /**
         * @property  dest
         * @description Specifies what to execute. The value can be one of:
         * "<label>" - section in the current document to execute.
         * "https://<URL>" - URL pointing to the document to execute. Sends HTTP POST.
         */
        dest: string;
        /**
         * @property  params
         * @description Named parameters to send to section or URL
         */
        params?: { [key: string]: any };
        /**
         * @property  meta
         * @description User-defined metadata, ignored by SignalWire
         */
        meta?: { [key: string]: any };
        /**
         * @property  on_return
         * @description The list of SWML instructions to be executed when the executed section or URL returns
         */
        on_return?: Instruction[];
    };
};

/**
 * @title Request
 * @description Send a GET, POST, PUT, or DELETE request to a remote URL.
 */
export type Request = {
    /**
     * @property request
     * @description Defines the request structure
     */
    request: {
        /**
         * @property url
         * @description The URL to which the request is to be sent.
         */
        url: string;

        /**
         * @property method
         * @description The HTTP method to be used for the request. Can be "GET", "POST", "PUT", or "DELETE".
         */
        method: RequestMethod;

        /**
         * @property headers
         * @description Optional. An object representing the headers to be included in the request.
         */
        headers?: { [key: string]: any };

        /**
         * @property body
         * @description Optional. The body of the request. Can be a string or an object.
         */
        body?: string | { [key: string]: any };

        /**
         * @property timeout
         * @description Optional. Maximum time in seconds to wait for a response. Default is 5.0 seconds.
         */
        timeout?: number;

        /**
         * @property connect_timeout
         * @description Optional. Maximum time in seconds to wait for a connection. Default is 5.0 seconds.
         */
        connect_timeout?: number;

        /**
         * @property save_variables
         * @description Optional. Store parsed JSON response as variables. Default is false.
         */
        save_variables?: boolean;
    };
};

/**
 * @title Return
 * @description Return from `execute` or exit script.
 */
export type Return = {
    /**
     * @property return
     * @description Defines the return structure
     */
    return: {
        /**
         * @property  key
         * @description The user-defined key to be used to store the value.
         */
        [key: string]: any
    };
};

/**
 * @title Set
 * @description Set script variables to the specified values.
 */
export type Set = {
    /**
     * @property set
     * @description Defines the set structure
     */
    set: {
        /**
         * @property  key
         * @description Accepts an object mapping variable names to values.
         */
        [key: string]: any
    };
};

/**
 * @title Switch
 * @description Execute a sequence of instructions depending on which value matches a variable.
 */
export type Switch = {
    /**
     * @property switch
     * @description Defines the switch structure
     */
    switch: {
        /**
         * @property  variable
         * @description Name of the variable whose value needs to be compared
         */
        variable: string;
        /**
         * @property  case
         * @description Object of values mapped to array of instructions to execute
         */
        case?: { [key: string]: Instruction[]; };
        /**
         * @property  default
         * @description Optional array of instructions to execute if no cases match
         */
        default?: Instruction[];
    };
};

/**
 * @title Transfer
 * @description Transfer the execution of the script to a new URL.
 */
export type Transfer = {
    /**
     * @property transfer
     * @description Defines the transfer structure
     */
    transfer: {
        /**
         * @property  dest
         * @description Specifies where to transfer the call. The value can be one of:
         * "<label>" - section in the current document to transfer to.
         * "https://<URL>" - URL pointing to the document to transfer to. Sends HTTP POST.
         * "relay:<relay application>" - relay application to notify (currently not implemented)
         **/
        dest: string;
        /**
         * @property  params
         * @description Named parameters to send to a section, URL, or application. Optional. Default is not set.
         */
        params?: { [key: string]: any };
        /**
         * @property  meta
         * @description User data, ignored by SignalWire. Optional. Default is not set.
         */
        meta?: { [key: string]: any };
        //result?: Cond | Switch | Array<Cond | Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

/**
 * @title Unset
 * @description Unset the specified variables.
 */
export type Unset = {
    /**
     * @property unset
     * @description Defines the unset structure
     */
    unset: {
        /**
         * @property  vars
         * @description Names of the variables to unset.
         */
        vars: string | string[];
    };
};

/**
 * @title AI
 * @description Create an AI agent with a prompt.
 */
export type AI = {
    /**
     * @property ai  Defines the AI structure
     * @description This type defines the AI structure with 'prompt', 'post_prompt', 'post_prompt_url', 'post_prompt_auth_user', 'post_prompt_auth_password', 'params', 'SWAIG', 'hints', 'languages', and 'pronounce' parts.
     */
    ai: {
        /**
         * @property  prompt
         * @description Establishes the initial set of instructions and settings to configure the agent. This is a **required** parameter
         */
        prompt?: AIPrompt;
        /**
         * @property  post_prompt
         * @description Establishes the follow-up set of instructions and settings to configure the agent. This is an **optional** parameter
         */
        post_prompt?: AIPrompt;
        /**
         * @property  post_prompt_url
         * @description The URL to send the post-prompt to. This is an **optional** parameter
         */
        post_prompt_url?: string;
        /**
         * @property  post_prompt_auth_user
         * @description The username for the post-prompt URL. This is an **optional** parameter
         */
        post_prompt_auth_user?: string;
        /**
         * @property  post_prompt_auth_password
         * @description The password for the post-prompt URL. This is an **optional** parameter
         */
        post_prompt_auth_password?: string;
        /**
         * @property  params
         * @description The parameters to configure the AI agent. This is an **optional** parameter
         */
        params?: AIParams;
        /**
         * @property SWAIG
         * @description The SignalWire AI Gateway (SWAIG) configuration. This is an **optional** parameter
         **/
        SWAIG?: SWAIG;
        /**
         * @property  hints
         * @description Words or phrases to help the AI agent understand the context of the conversation. This is an **optional** parameter
         */
        hints?: string[];
        /**
         * @property  languages
         * @description The languages the AI agent can understand and speak. This is an **optional** parameter
         */
        languages?: AILanguage[];
        /**
         * @property  pronounce
         * @description Words or phrases to help the AI agent pronounce correctly. This is an **optional** parameter
         */
        pronounce?: AIPronounce[];
    };
};

/**
 * @title AIPronounce
 * @description Use this object to clarify AI's pronunciation of certain words or expressions.
 */
export type AIPronounce = {
    /**
     * @property  replace
     * @description The word or phrase to replace.
     */
    replace: string;
    /**
     * @property  with
     * @description The word or phrase to replace with.
     */
    with: string;
    /**
     * @property  ignore_case
     * @description Optional. If true, the AI agent will ignore the case when replacing the word or phrase. Default is false.
     */
    ignore_case?: boolean;
};

/**
 * @title AILanguage
 * @description If changing the language from the default, all three parameters are required for a valid entry.
 */
export type AILanguage = {
    /**
     * @property  name
     * @description The name of the language.
     */
    name: string;
    /**
     * @property  code
     * @description The code of the language.
     */
    code: string;
    /**
     * @property  voice
     * @description Optional. The voice to use for the language.
     */
    voice?: string;
};

/**
 * @title AIParams
 * @description Parameters for AI that can be passed in `ai.params` at the top level of the `ai` Method.
 */
export type AIParams = {
    /**
     * @property  direction
     * @description The direction of the AI agent. Can be "inbound" or "outbound".
     */
    direction?: AIDirection
    /**
     * @property  wait_for_user
     * @description Optional. If true, the AI agent will wait for the user to speak before responding. Default is false.
     */
    wait_for_user?: boolean;
    /**
     * @property  end_of_speech_timeout
     * @description Optional. The time in milliseconds to wait for the user to stop speaking. Default is 2000 milliseconds.
     * Valid range is 250 to 10000 milliseconds.
     */
    end_of_speech_timeout?: number;
    /**
     * @property attention_timeout
     * @description Optional. Amount of time, in ms, to wait before prompting the user to respond.
     * Default is 10000 milliseconds.
     * Valid range is 10000 to 600000 milliseconds.
     * Set to 0 to disable.
     **/
    attention_timeout?: number;
    /**
     * @property  inactivity_timeout
     * @description Optional. Amount of time, in ms, to wait before exiting the app due to inactivity.
     * Default is 600000 milliseconds.
     * Valid range is 10000 to 3600000 milliseconds.
     */
    inactivity_timeout?: number;
    /**
     * @property  background_file
     * @description Optional. URL of audio file to play in the background while AI plays in the foreground.
     */
    background_file?: string;
    /**
     * @property  background_file_loops
     * @description Optional. Maximum number of times to loop playing the background file.
     * Default is undefined. (Loop indefinitely)
     */
    background_file_loops?: number;
    /**
     * @property  background_file_volume
     * @description Optional. Volume level for the background file.
     * Default is 0
     * Valid range is -40 to 40
     */
    background_file_volume?: number;
    /**
     * @property  ai_volume
     * @description Optional. Volume level for the AI agent.
     * Default is 0.
     * Valid range is -50 to 50.
     */
    ai_volume?: number;
    /**
     * @property  local_tz
     * @description Optional. Timezone to use for the AI agent. Values are IANA time zone ID's.
     * Default is "GMT".
     */
    local_tz?: string;
    /**
     * @property  conscience
     * @description Optional. Send a summary of the conversation after the call ends.
     * This requires a `post_url` to be set in the ai parameters and the `conversation_id` defined below.
     * This eliminates the need for a `post_prompt` in the ai parameters.
     * Default is false.
     */
    conscience?: boolean;
    /**
     * @property  save_conversation
     * @description Optional. Save the conversation
     * Default is false.
     */
    save_conversation?: boolean;
    /**
     * @property  conversation_id
     * @description Optional. Unique identifier for this conversation to be used to retain info from call to call
     */
    conversation_id?: string;
    /**
     * @property digit_timeout
     * @description Optional. Time, in ms, at the end of digit input to detect the end of input.
     * Default is 3000 milliseconds.
     * Valid range is 250 to 10000 milliseconds.
     */
    digit_timeout?: number;
    /**
     * @property digit_terminators
     * @description Optional. DTMF digit, as a string, to signal the end of input (ex: "#")
     */
    digit_terminators?: string;
    /**
     * @property energy_level
     * @description Optional. Amount of energy necessary for bot to hear you (in dB)
     * Default is 52.
     * The Valid range is 0.0 to -100.0
     */
    energy_level?: number;
    /**
     * @property  swaig_allow_swml
     * @description Optional. Allow SWAIG functions to return SWML to be executed by the call?
     * Default is true.
     */
    swaig_allow_swml?: boolean;
};

/**
 * @title AIDirection
 * @description Forces the direction of the call to the assistant.
 * Valid values are `inbound` and `outbound`.
 * @enum {string}
 *
 */
export type AIDirection = "inbound" | "outbound";

/**
 * @title AIPrompt
 * @description The Prompt object that is used to configure the AI agent.
 */
export type AIPrompt = {
    /**
     * @property  text
     * @description The instructions to send to the AI agent.
     */
    text?: string;
    /**
     * @property  temperature
     * @description Randomness setting. Float value between 0.0 and 1.5.
     * Closer to 0 will make the output less random.
     * Default is 1.0.
     */
    temperature?: number;
    /**
     * @property  top_p
     * @description Randomness setting. Alternative to `temperature`.
     * Float value between 0.0 and 1.0.
     * Closer to 0 will make the output less random. Default is 1.0.
     */
    top_p?: number;
    /**
     * @property  confidence
     * @description Threshold to fire a speech-detect event at the end of the utterance.
     * Float value between 0.0 and 1.0.
     * Decreasing this value will reduce the pause after the user speaks, but may introduce false positives.
     * Default is 0.6.
     */
    confidence?: number;
    /**
     * @property  presence_penalty
     * @description Aversion to staying on topic. Float value between -2.0 and 2.0. Positive values increase the model's likelihood to talk about new topics. Default is 0.0.
     */
    presence_penalty?: number;
    /**
     * @property  frequency_penalty
     * @description Aversion to repeating lines.
     * Float value between -2.0 and 2.0.
     * Positive values decrease the model's likelihood to repeat the same line verbatim.
     * Default is 0.0.
     */
    frequency_penalty?: number;
    //result?: Cond | Switch | Array<Cond | Switch>; // TODO: Add ResultElement type once result is implemented
};

/**
 * @title Answer
 * @description Answer incoming call and set an optional maximum duration.
 */
export type Answer = "answer" |
/**
 * @property answer
 * @description Defines the answer structure
 */
    {
        answer: {
        /**
         * @property  max_duration
         * @description Maximum time in seconds to wait for an answer.
         * Cannot be less than 7 seconds.
         * Default is 14400 seconds.
         */
        max_duration?: number;
    };
};

/**
 * @title Connect
 * @description Dial a SIP URI or phone number.
 */
export type Connect = {
    /**
     * @property connect
     * @description Defines the connect structure
     */
    connect: {
        /**
         * @property  from
         * @description Optional. The caller ID to use when dialing the number.
         */
        from?: string;
        /**
         * @property  headers
         * @description Optional. Custom SIP headers to add to INVITE.
         * It Has no effect on calls to phone numbers.
         */
        headers?: { [key: string]: any };
        /**
         * @property  codecs
         * @description Optional. Comma-separated string of codecs to offer.
         * It has no effect on calls to phone numbers.
         * Based on SignalWire settings.
         */
        codecs?: string;
        /**
         * @property  webrtc_media
         * @description Optional. If true, WebRTC media is offered to the SIP endpoint.
         * It has no effect on calls to phone numbers.
         * Default is false.
         */
        webrtc_media?: boolean;
        /**
         * @property  session_timeout
         * @description Optional. Time, in seconds, to set the SIP `Session-Expires` header in INVITE.
         * Must be a positive, non-zero number.
         * It has no effect on calls to phone numbers.
         * Based on SignalWire settings.
         */
        session_timeout?: number;
        /**
         * @property  ringback
         * @description Optional. Array of URIs to play as ringback tone.
         */
        ringback?: string[];
        /**
         * @property  timeout
         * @description Optional. Time, in seconds, to wait for the call to be answered.
         * Default is 60 seconds.
         */
        timeout?: number;
        /**
         * @property  max_duration
         * @description Optional. Maximum duration, in seconds, allowed for the call.
         * Default is 14400 seconds.
         */
        max_duration?: number;
        /**
         * @property  answer_on_bridge
         * @description Optional. Delay answer until the B-leg answers.
         * Default is false.
         */
        answer_on_bridge?: boolean;
        /**
         * @property  call_state_url
         * @description Optional. Webhook url to send call state change notifications to for all legs.
         * It can be overwritten on each destination.
         */
        call_state_url?: string;
        /**
         * @property  call_state_events
         * @description Optional. An array of call state event names to be notified about.
         * Allowed event names are `created`, `ringing`, `answered`, and `ended`.
         * It can be overwritten on each destination.
         */
        call_state_events?: string[];
        // result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

/**
 * @title Denoise
 * @description Start noise reduction.
 */
export type Denoise =
/**
 * @property denoise
 * @description Defines the denoise structure
 */
 {
    denoise: {};
};

/**
 * @title Hangup
 * @description Hangup the call.
 */
export type Hangup =
/**
 * @property hangup
 * @description Defines the hangup structure
 */
    {
        hangup: {
        /**
         * @property  reason
         * @description The reason for hanging up the call.
         */
        reason?: HangupReason;
    };
};

/**
 * @title HangupReason
 * @description The reason for hanging up the call.
 * @enum {string}
 * @const {string} hangup - The call was hung up.
 * @const {string} busy - The call was busy.
 * @const {string} decline - The call was declined.
 */
export enum HangupReason {
    hangup = "hangup",
    busy = "busy",
    decline = "decline"
}



/**
 * @title JoinRoom
 * @description Join a RELAY room.
 */
export type JoinRoom = {
    /**
     * @property join_room
     * @description Defines the join_room structure
     */
    join_room: {
        /**
         * @property  name
         * @description The name of the room to join.
         */
        name: string;
    };
};

/**
 * @title Play
 * @description Play file(s), ringtones, speech or silence.
 */
export type Play = {
    /**
     * @property play
     * @description Defines the play structure
     */
    play: {
        /**
         * @property  url
         * @description Optional. URL or array of URLs to play.
         * Allowed URLs are:
         * http:// or https:// - audio file to GET
         * ring:[duration:]<country code> - ring tone to play. For example: ring:us to play single ring or ring:20.0:us to play ring for 20 seconds.
         * say:<text to speak> - Sentence to say
         * silence: <duration> - seconds of silence to play
         */
        url?: string;
        /**
         * @property urls
         * @description Optional. URL or array of URLs to play.
         * Allowed URLs are:
         * http:// or https:// - audio file to GET
         * ring:[duration:]<country code> - ring tone to play. For example: ring:us to play single ring or ring:20.0:us to play ring for 20 seconds.
         * say:<text to speak> - Sentence to say
         * silence: <duration> - seconds of silence to play
         */

        urls?: string[];
        /**
         * @property  volume
         * @description Optional. Volume level for the audio file.
         * Default is 0.
         * Valid range is -40 to 40.
         */
        volume?: number;
        /**
         * @property  say_voice
         * @description Optional. The voice to use for the text to speech.
         */
        say_voice?: string;
        /**
         * @property  say_language
         * @description Optional. The language to use for the text to speech.
         */
        say_language?: string;
        /**
         * @property say_gender
         * @description Optional. Gender to use for the text to speech.
         */
        say_gender?: string;
    };
};

/**
 * @title Prompt
 * @description Play a prompt and wait for digit or speech input.
 * Speech detection is not enabled unless at least one speech parameter is set.
 * If only speech parameters are set (and no digit parameters), digit detection is not enabled.
 * To enable both digit and speech detection, set at least one parameter for each.
 */
export type Prompt = {
    /**
     * @property prompt
     * @description Defines the prompt structure
     */
    prompt: {
        /**
         * @property  play
         * @description URL or array of URLs to play.
         * Allowed URLs are:
         * http:// or https:// - audio file to GET
         * ring:[duration:]<country code> - ring tone to play. For example: ring:us to play single ring or ring:20.0:us to play ring for 20 seconds.
         * say:<text to speak> - Sentence to say
         * silence: <duration> - seconds of silence to play
         */
        play: string | string[];
        /**
         * @property  volume
         * @description Optional. Volume level for the audio file.
         * Default is 0.
         * Valid range is -40 to 40.
         */
        volume?: number;
        /**
         * @property  say_voice
         * @description Optional. The voice to use for the text to speech.
         */
        say_voice?: string;
        /**
         * @property  say_language
         * @description Optional. The language to use for the text to speech.
         */
        say_language?: string;
        /**
         * @property say_gender
         * @description Optional. The gender to use for the text to speech.
         */
        say_gender?: string;
        /**
         * @property  max_digits
         * @description Optional. Number of digits to collect. Default is 1.
         */
        max_digits?: number;
        /**
         * @property terminators
         * @description Optional. Digits that terminate digit collection
         */
        terminators?: string;
        /**
         * @property  digit_timeout
         * @description Optional. Time in seconds to wait for next digit.
         * Default is 5.0 seconds.
         */
        digit_timeout?: number;
        /**
         * @property initial_timeout
         * @description Optional. Time in seconds to wait for start of input.
         * Default is 5.0 seconds.
         */
        initial_timeout?: number;
        /**
         * @property  speech_timeout
         * @description Optional. 	Max time in seconds to wait for speech result
         */
        speech_timeout?: number;
        /**
         * @property  speech_end_timeout
         * @description Optional. Time in seconds to wait for end of speech utterance
         */
        speech_end_timeout?: number;
        /**
         * @property  speech_language
         * @description Optional. 	Language to detect speech in
         */
        speech_language?: string;
        /**
         * @property  speech_hints
         * @description Optional. Words or phrases to help the speech recognition
         */
        speech_hints?: string[];
        //result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

/**
 * @title ReceiveFax
 * @description Receive a fax.
 */
export type ReceiveFax =
/**
 * @property receive_fax
 * @description Defines the receive_fax structure
 */
    {
        receive_fax: {};
    };

/**
 * @title Record
 * @description Record the call audio in the foreground. Use this, for example, to record voicemails.
 */
export type Record =
/**
 * @property record
 * @description Defines the record structure
 */
 {
    record: {
        /**
         * @property stereo
         * @description Optional. If true, record in stereo. Default is false.
         */
        stereo?: boolean;
        /**
         * @property format
         * @description Optional. The format to record in. Can be "wav" or "mp3". Default is "wav".
         */
        format?: RecordFormat
        /**
         * @property direction
         * @description Optional. Direction of the audio to record: "speak" for what party says, "listen" for what party hears.
         * Default is "speak".
         */
        direction?: RecordAudioDirection
        /**
         * @property terminators
         * @description Optional. String of digits that will stop the recording when pressed
         */
        terminators?: string;
        /**
         * @property beep
         * @description Optional. Play a beep before recording. Default is false.
         */
        beep?: boolean;
        /**
         * @property input_sensitivity
         * @description Optional. Input sensitivity for the recording. Default is 44.0.
         */
        input_sensitivity?: number;
        /**
         * @property initial_timeout
         * @description Optional. Time in seconds to wait for the start of speech. Default is 4.0 seconds.
         */
        initial_timeout?: number;
        /**
         * @property end_silence_timeout
         * @description Optional. Time in seconds to wait in silence before ending the recording.
         * Default is 5.0 seconds.
         */
        end_silence_timeout?: number;
    };
};

/**
 * @title RecordAudioDirection
 * @description The direction of the audio to record.
 * @enum {string}
 * @const {string} speak - Record what the party says.
 * @const {string} listen - Record what the party hears.
 */
export enum RecordAudioDirection {
    speak = "speak",
    listen = "listen"
}

/**
 * @title RecordFormat
 * @description The format to record in.
 * @enum {string}
 * @const {string} wav - Record in wav format.
 * @const {string} mp3 - Record in mp3 format.
 */
export enum RecordFormat {
    wav = "wav",
    mp3 = "mp3"

}

/**
 * @title RecordCall
 * @description Record the call audio in the background.
 */
export type RecordCall = {
    /**
     * @property record_call
     * @description Defines the record_call structure
     */
    record_call: {
        /**
         * @property control_id
         * @description Optional. Identifier for this recording, to use with `stop_call_record`
         */
        control_id?: string;
        /**
         * @property stereo
         * @description Optional. If true, record in stereo. Default is false.
         */
        stereo?: boolean;
        /**
         * @property format
         * @description Optional. The format to record in. It can be "wav" or "mp3". Default is "wav".
         */
        format?: RecordFormat
        /**
         * @property direction
         * @description Optional. Direction of the audio to record: "speak" for what party says, "listen" for what party hears, "both" for what the party hears and says
         * Default is "both".
         */
        direction?: RecordCallAudioDirection
        /**
         * @property terminators
         * @description Optional. String of digits that will stop the recording when pressed
         */
        terminators?: string;
        /**
         * @property beep
         * @description Optional. Play a beep before recording. Default is false.
         */
        beep?: boolean;
        /**
         * @property input_sensitivity
         * @description Optional. Input sensitivity for the recording. Default is 44.0.
         */
        input_sensitivity?: number;
        /**
         * @property initial_timeout
         * @description Optional. Time in seconds to wait for the start of speech. Default is 0.0 seconds.
         */
        initial_timeout?: number;
        /**
         * @property end_silence_timeout
         * @description Optional. Time in seconds to wait in silence before ending the recording.
         * Default is 0.0 seconds.
         */
        end_silence_timeout?: number;
    };
};

/**
 * @title RecordCallAudioDirection
 * @description The direction of the audio to record.
 * @enum {string}
 * @const {string} speak - Record what the party says.
 * @const {string} listen - Record what the party hears.
 * @const {string} both - Record what the party hears and says.
 */
export enum RecordCallAudioDirection {
    speak = "speak",
    listen = "listen",
    both = "both"

}

/**
 * @title SendDigits
 * @description Send DTMF digits.
 */
export type SendDigits = {
    /**
     * @property send_digits
     * @description Defines the send_digits structure
     */
    send_digits: {
        /**
         * @property  digits
         * @description The DTMF digits to send.
         */
        digits: string;
    };
};

/**
 * @title SendFax
 * @description Send a fax.
 */
export type SendFax = {
    /**
     * @property send_fax
     * @description Defines the send_fax structure
     */
    send_fax: {
        /**
         * @property  document
         * @description URL to the PDF document to fax
         */
        document: string;
        /**
         * @property  header_info
         * @description Optional. Header text to include on the fax
         */
        header_info?: string;
        /**
         * @property  identity
         * @description Optional. Station identity to report. Default is the calling party's caller ID number.
         */
        identity?: string;
    };
};


/**
 * @title SendSMS
 * @description Send an SMS message.
 */
export type SendSMS = {
    /**
     * @property send_sms
     * @description Defines the send_sms structure
     */
    send_sms: {
        /**
         * @property  to_number
         * @description The phone number to send the SMS to.
         */
        to_number: string;
        /**
         * @property  from_number
         * @description Optional. The phone number to send the SMS from. Default is the calling party's caller ID number.
         */
        from_number: string;
        /**
         * @property  body
         * @description The body of the SMS message.
         */
        body?: string;
        /**
         * @property  media
         * @description Optional. Array of media URLs to include in the message
         */
        media?: string[];
        /**
         * @property  region
         * @description Optional. The region to use for the SMS. Default is "us".
         * Default is picked based on account preferences or device location.
         */
        region?: string;
        /**
         * @property  tags
         * @description Optional. 	Array of tags to associate with the message to facilitate log searches
         */
        tags?: string[];
    };
};

/**
 * @title SipRefer
 * @description Send SIP REFER to a SIP call.
 */

export type SIPRefer = {
    /**
     * @property sip_refer
     * @description Defines the sip_refer structure
     */
    sip_refer: {
        /**
         * @property  to_uri
         * @description The SIP URI to send the REFER to.
         */
        to_uri: string;
        // result?: Cond | Switch | Array<Cond|Switch>; // TODO: Add ResultElement type once result is implemented
    };
};

/**
 * @title StopDenoise
 * @description Stop noise reduction.
 */
export type StopDenoise = {
    /**
     * @property stop_denoise
     * @description Defines the stop_denoise structure
     */
    stop_denoise: {};
};

/**
 * @title StopRecordCall
 * @description Stop an active background recording.
 */
export type StopRecordCall =
/**
 * @property stop_record_call
 * @description Defines the stop_record_call structure
 */
 {
    stop_record_call: {
        /**
         * @property control_id
         * @description Identifier for the recording to stop
         */
        control_id?: string;
    };
};

/**
 * @title StopTap
 * @description Stop an active tap stream.
 */
export type StopTap =
/**
 * @property stop_tap
 * @description Defines the stop_tap structure
 */
 {
    stop_tap: {
        /**
         * @property control_id
         * @description ID of the tap to stop
         */
        control_id?: string;
    };
};

/**
 * @title SWAIG
 * @description This type defines the SignalWire AI Gateway (SWAIG) configuration.
 */
export type SWAIG = {
    /**
     * @property  defaults
     * @description 	Default settings for all SWAIG functions.
     * If defaults are not set, settings may be set in each function object.
     * Optional. Default is not set.
     */
    defaults?: WebHookDefaults;
    /**
     * @property  includes
     * @description An array of objects to include remote function signatures.
     * The object fields are url to specify where the remote functions are defined and functions, which is an array of the function names as strings.
     * See the examples below of implementation.
     */
    includes?: { [key: string]: any }[];
    /**
     * @property  functions
     * @description An array of JSON objects to define functions that can be executed during the interaction with the AI.
     * Optional. Default is not set.
     */
    functions?: FunctionConfig[];
};

/**
 * @title WebHookDefaults
 * @description WebHookDefaults defines the default settings for all SWAIG functions.
 */
type WebHookDefaults = {
    /**
     * @property  web_hook_url
     * @description The URL to send the webhook to.
     */
    web_hook_url?: string;
    /**
     * @property  web_hook_auth_user
     * @description The username for the webhook URL.
     */
    web_hook_auth_user?: string;
    /**
     * @property  web_hook_auth_password
     * @description The password for the webhook URL.
     */
    web_hook_auth_password?: string;
};

/**
 * @title FunctionConfig
 * @description This type defines the configuration for a SignalWire Function.
 */
type FunctionConfig = {
    /**
     * @property  active
     * @description Whether the function is active. Optional. Default is true.
     */
    active?: boolean;
    /**
     * @property  function
     * @description The unique name of the function.
     */
    function: string;
    /**
     * @property  meta_data
     * @description A JSON object containing any metadata, as a key-value map. Optional.
     * Default is not set.
     */
    meta_data?: { [key: string]: any }[];
    /**
     * @property  meta_data_token
     * @description Scoping token for meta_data.
     * If not supplied, metadata will be scoped to function's `web_hook_url`.
     * Optional. Default is set by SignalWire.
     */
    meta_data_token?: string;
    /**
     * @property  data_map
     * @description An object containing properties to process or validate the input,
     * perform actions based on the input, or connect to external APIs or services in a serverless fashion.
     */
    data_map: DataMap[];
    /**
     * @property  web_hook_url
     * @description The URL to send the webhook to.
     */
    web_hook_url?: string;
    /**
     * @property  web_hook_auth_user
     * @description The username for the webhook URL.
     */
    web_hook_auth_user?: string;
    /**
     * @property  web_hook_auth_password
     * @description The password for the webhook URL.
     */
    web_hook_auth_pass?: string;
    /**
     * @property  purpose
     * @description A description of the context and purpose of the function, to explain to the agent when to use it.
     */
    purpose: string;
    /**
     * @property  argument
     * @description A JSON object defining the input that should be passed to the function.
     * The fields of this object are the following two parameters.
     */
    argument: FunctionArgument;
};

/**
 * @title DataMap
 * @description An object containing properties to process or validate the input, perform actions based on the input, or connect to external APIs or services in a serverless fashion.
 */
type DataMap = {
    /**
     * @property  expressions
     * @description An array of objects that define patterns and corresponding actions
     */
    expressions: Expression[];
    /**
     * @property  webhooks
     * @description An array of objects that define external API calls.
     */
    webhooks: WebhookConfig;
};

/**
 * @title Expression
 * @description An object that defines patterns and corresponding actions.
 */
type Expression = {
    /**
     * @property  string
     * @description 	The actual input or value from the user or system.
     */
    string: string;
    /**
     * @property  pattern
     * @description A regular expression pattern to validate or match the string.
     */
    pattern: string;
    /**
     * @property  output
     * @description Defines the response or action to be taken when the pattern matches.
     */
    output: ExpressionOutput;
};

/**
 * @title ExpressionOutput
 * @description The response or action to be taken when the pattern matches.
 */
type ExpressionOutput = {
    /**
     * @property  response
     * @description A static response text or message.
     */
    response: string;
    /**
     * @property  action
     * @description A list of actions to be performed upon matching.
     */
    action: { [key: string]: any }[];
};

/**
 * @title WebhookConfig
 * @description An type that defines the configuration for a webhook.
 */
type WebhookConfig = {
    /**
     * @property  url
     * @description The endpoint for the external service or API.
     */
    url: string;
    /**
     * @property  headers
     * @description A map of headers to send to the webhook.
     */
    headers: { [key: string]: any };
    /**
     * @property  method
     * @description The HTTP method to use for the webhook.
     */
    method: RequestMethod
    /**
     * @property  output
     * @description Defines the format or structure of the response from the API.
     */
    output: WebhookOutput;
};

/**
 * @title WebhookOutput
 * @description Defines the format or structure of the response from the API.
 */
type WebhookOutput = {
    /**
     * @property  action
     * @description A list of actions to be performed upon matching.
     */
    action: Instruction[];
    /**
     * @property  response
     * @description A static response text or message based on the outcome of the API call.
     */
    response: string;
};


/**
 * @title FunctionArgument
 * @description A JSON object defining the input that should be passed to the function.
 * The fields of this object are the following two parameters.
 *
 */
type FunctionArgument = {
    /**
     * @property  type
     * @description The type of argument the AI is passing to the function. Possible values are "string" and "object".
     */
    type: string | { [key: string]: any };
    /**
     * @property  properties
     * @description A JSON object describing the argument.
     * The value is set by the user.
     * For example, "location" for a location-based search or "company" if searching a database of companies.
     * This object has sub-parameters description and type to help define the property.
     */
    properties: { [key: string]: any };
};


/**
 * @title Tap
 * @description Start background call tap. Media is streamed over Websocket or RTP to customer controlled URI.
 */
export type Tap = {
    /**
     * @property tap
     * @description Defines the tap structure
     */
    tap: {
        /**
         * @property  uri
         * @description Destination of the tap media stream
         */
        uri: string;
        /**
         * @property  control_id
         * @description Optional. Identifier for this tap to use with stop_tap
         */
        control_id?: string;
        /**
         * @property  direction
         * @description Optional. Direction of the audio to tap: `speak` for what party says,
         * `listen` for what party hears,
         * `both` for what party hears and says.
         * Default is `both`.
         */
        direction?: string;
        /**
         * @property  codec
         * @description Optional. Codec to use for the tap media stream. Options are "PCMU" and "PCMA".
         * Default is "PCMU".
         */
        codec?: string;
        /**
         * @property  rtp_ptime
         * @description Optional. Set the packetization time of the media in milliseconds.
         * Default is 20 milliseconds.
         */
        rtp_ptime?: number;
    };
};