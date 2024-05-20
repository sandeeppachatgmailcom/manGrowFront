import { useEffect, useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { BsFillFloppyFill } from "react-icons/bs";
import uploadAudio from '../../services/saveAudio';

export default function VoiceRecorder(props: any) {
  const { value } = props;
  const [recordings, setRecordings] = useState([]); // Array to store audio recordings
  const [audioFileType, setAudioFileType] = useState('audio/wav'); // Default audio file type

  const loadAttachment = (audioLink: string) => {
    console.log(value, 'its working ');
    if (audioLink?.length) {
      const audio = document.createElement('audio');
      audio.src = audioLink; // Use audioLink directly instead of value
      audio.controls = true;
      setRecordings([{ audio }]); // Assuming you only need to set the audio element
    }
  };

  useEffect(() => {
    loadAttachment(value);
  }, [props.value]);

  useEffect(() => {
    console.log(recordings, recordings[0]?.audio.src, 'recordings');
  }, [recordings]);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const handleRecordComplete = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;

    const newRecording = { audio, blob };
    setRecordings((prevRecordings: any) => [...prevRecordings, newRecording]); // Add recording to state with blob for upload
    saveAudio();
  };

  const saveAudio = async () => {
    const recording = recordings[0]; // Assuming you want to upload the first recording only
    if (!recording) return; // Handle empty recordings

    const audioBlob = recording.blob;
    const audioUrl = await uploadAudio(audioBlob); // Upload the blob

    const e = {
      target: {
        name: 'audioLink',
        value: audioUrl,
      },
    };
    props.onChange(e);
  };

  return (
    <div className="flex align-middle p-1  border-blue-600 " id="audio">
      {recordings.map((recording, index) => (
        <div key={index} className="recording-item me-1 flex h-[50px] overflow-hidden shadow-md shadow-gray-100 rounded-full ">
          <audio src={recording.audio.src} controls />
          {/* <button onClick={() => handleDeleteRecording(index)}>Delete</button> */}
        </div>
      ))}
      <div className='h-10 flex '>
        <AudioRecorder
          onRecordingComplete={handleRecordComplete}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
        {recordings.length ? (
          <button
            onClick={saveAudio}
            className="ms-1 flex justify-evenly rounded-full shadow-md shadow-gray-100 items-center border bg-gray-100 text-black w-10 w-30 hover:border hover:border-blue-400 hover:text-blue-500 "
          >
            <BsFillFloppyFill />
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
