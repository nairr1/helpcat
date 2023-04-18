import React, { type Dispatch, type SetStateAction, useState } from "react";
import Image from "next/image";

import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import { useUser } from "@clerk/nextjs";

import { 
    TbBold,
    TbColorPicker,
    TbItalic,
    TbUnderline,
} from "react-icons/tb";
import { CgUndo, CgRedo, CgClose } from "react-icons/cg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdExpandMore, MdEdit } from "react-icons/md";

import { api } from "~/utils/api";

import parse from "html-react-parser";
import styled from "styled-components";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import sadcat from "../components/assets/helpcatNotFound.jpeg";
import helpcat from "../components/assets/helpcat.jpeg";
import Header from "~/components/Header";
import { userVerification } from "~/utils/userVerification";
import HelpcatPageLoader from "~/components/HelpcatPageLoader";

type CreatePostWizardProps = {
    togglePostWizard: boolean;
    togglePostWizardDropdown: boolean;
    handlePostWizardToggle: () => void;
    editor: Editor | null;
    formTitle: string;
    setFormTitle: Dispatch<SetStateAction<string>>;
    formLink: string;
    setFormLink: Dispatch<SetStateAction<string>>;
    formTopic: string;
    setFormTopic: Dispatch<SetStateAction<string>>;
    editPost: boolean;
    setEditPost: Dispatch<SetStateAction<boolean>>;
    updatedPostId: number;
    topicsList: string[];
    topics: {
        [key: string]: boolean
    };
    setTopics: Dispatch<SetStateAction<{
        [key: string]: boolean
    }>>
}

type PostProps = {
    id: number;
    authorId: string;
    authorFirstName: string;
    authorLastName: string;
    authorProfileImageUrl: string;
    updatedAuthorFirstName: string;
    updatedAuthorLastName: string;
    createdAt: Date;
    title: string;
    content: string;
    topic: string;
    link: string;
    editor: Editor | null;
    setFormTitle: Dispatch<SetStateAction<string>>;
    setFormLink: Dispatch<SetStateAction<string>>;
    setFormTopic: Dispatch<SetStateAction<string>>;
    setEditPost: Dispatch<SetStateAction<boolean>>;
    setUpdatedPostId: Dispatch<SetStateAction<number>>;
    topics: {
        [key: string]: boolean
    };
    setTopics: Dispatch<SetStateAction<{
        [key: string]: boolean
    }>>
    setTogglePostWizard: Dispatch<SetStateAction<boolean>>;
    setTogglePostWizardDropdown: Dispatch<SetStateAction<boolean>>;
}

dayjs.extend(relativeTime);

const HelpcatLoading = () => {
    return (
        <div className='absolute w-[100%] rounded-2xl h-[100%] top-0 left-0 backdrop-blur-sm z-50'>
            <div className='flex flex-col items-center justify-center relative top-1/3'>
                <HelpcatLoadingAnimation>
                    <Image 
                        className='m-auto rounded-full'
                        src={helpcat} 
                        width={100}
                        height={100}
                        alt="Helpcat loading logo"
                    />
                </HelpcatLoadingAnimation>

                <div>
                    <p className='mt-[1rem] text-xs'>
                        H<E>E</E>LPCAT I<S>S</S> UPD<A>A</A>TI<N>N</N>G T<H>H</H>E <D>D</D>ATA<B>B</B>ASE..
                    </p>
                </div>
                
            </div>
        </div>
    );
};

const CreatePostWizard = ({ 
    togglePostWizard, 
    togglePostWizardDropdown,
    handlePostWizardToggle, 
    editor,
    formTitle,
    setFormTitle,
    formLink,
    setFormLink,
    formTopic,
    setFormTopic,
    editPost,
    setEditPost,
    updatedPostId,
    topicsList,
    topics,
    setTopics,
}: CreatePostWizardProps) => {
    function toggleSelectedTopic(topic: string) {
        setFormTopic(topic);

        Object.keys(topics).forEach((i) => topics[i] = false);

        setTopics((prev) => {    
            return {...prev, [topic]: true};
        });
    }

    const ctx = api.useContext();

    const { mutate: createPost, isLoading: isPosting } = api.posts.create.useMutation({
        onSuccess: () => {
            setFormTitle("");
            setFormLink("");
            setFormTopic("");
            editor?.commands.setContent("");
            Object.keys(topics).forEach((i) => topics[i] = false);
            void ctx.posts.getLatest.invalidate();
            void ctx.posts.getAll.invalidate();
            void ctx.posts.getUserPosts.invalidate();
        }
    });

    const { mutate: updatePost, isLoading: isUpdating } = api.posts.update.useMutation({
        onSuccess: () => {
            setFormTitle("");
            setFormLink("");
            setFormTopic("");
            editor?.commands.setContent("");
            Object.keys(topics).forEach((i) => topics[i] = false);
            void ctx.posts.getLatest.invalidate();
            void ctx.posts.getAll.invalidate();
            void ctx.posts.getUserPosts.invalidate();
            setEditPost(false);
        }
    });

    if (!editor) {
        return null;
    }

    const formContent = String(editor.getHTML()).replaceAll("<p></p>", "<br/>");

    return (
        <>
            {isPosting && (
                <HelpcatLoading />
            )}

            {isUpdating && (
                <HelpcatLoading />
            )}          
        
            <div 
            className={`flex flex-col p-6 rounded-2xl bg-20222e shadow-[0_3px_10px_rgb(0,0,0,0.5)] space-y-2 w-fit transition transform
                ${!togglePostWizard && "opacity-0 translate-x-full duration-1000" || ""}
                ${!togglePostWizardDropdown && "hidden" || ""}
            `}
            >
                <div className='flex justify-start'>
                    <MdExpandMore
                        className='text-[1.75rem] hover:bg-5e4fb3 cursor-pointer rotate-90 p-1 hover:bg-online bg-282a36 rounded-full transform transition duration-500 hover:-rotate-90' 
                        onClick={handlePostWizardToggle}
                    />
                </div>
                <p className="text-center pb-2">{editPost ? "Update Post" : "Create Post"}</p>

                <div className="flex items-center px-2 pt-1 rounded-lg">
                    <p className="text-sm font-light mr-1 text-ffffff/60">Topic</p>

                    <div className="text-xs items-center space-x-1 ">
                        {topicsList.map((topic, index) => (
                            <button 
                                key={index}
                                className={`text-xs bg-282a36 font-light w-fit px-2 py-1 rounded-lg ${topics[topic] === true && "bg-edc2d8ff text-1b1b1c" || ""}`}
                                onClick={(() => toggleSelectedTopic(topic))}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                <input 
                    type="text" 
                    className="placeholder-ffffff/60 outline-none bg-282a36 p-2 text-sm font-light rounded-lg"
                    placeholder="Title" 
                    spellCheck="true" 
                    onChange={((e) => setFormTitle(e.target.value))}
                    value={formTitle}
                    disabled={isPosting}
                />

                <input 
                    type="text" 
                    className="placeholder-ffffff/60 outline-none bg-282a36 p-2 text-sm font-light rounded-lg"
                    placeholder="Link" 
                    spellCheck="true" 
                    onChange={((e) => setFormLink(e.target.value))}
                    value={formLink}
                    disabled={isPosting}
                />

                <div className="flex flex-col w-full p-10 bg-282a36 rounded-lg">
                    <div className='flex items-center justify-center space-x-10'>
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()  
                            }
                            className={editor.isActive('bold') ? "text-edc2d8ff" : "text-ffffff/70" || ""}
                        >
                            <TbBold />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                            }
                            className={editor.isActive('italic') ? "text-edc2d8ff" : "text-ffffff/70" || ""}
                        >
                            <TbItalic />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                            }
                            className={editor.isActive('underline') ? "text-edc2d8ff" : "text-ffffff/70" || ""}
                        >
                            <TbUnderline />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().setColor("#68e2f4").run()}
                            className={editor.isActive('textStyle', { color: '#68e2f4' }) ? 'is-active text-68e2f4 border-b border-68e2f4' : 'text-ffffff/70 border-b border-68e2f4' || ""}
                        >
                            <TbColorPicker />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().setColor("#7072bc").run()}
                            className={editor.isActive('textStyle', { color: '#7072bc' }) ? 'is-active text-7072bc border-b border-7072bc' : 'text-ffffff/70 border-b border-7072bc' || ""}
                        >
                            <TbColorPicker />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().setColor("#9f70bc").run()}
                            className={editor.isActive('textStyle', { color: '#9f70bc' }) ? 'is-active text-9f70bc border-b border-9f70bc' : 'text-ffffff/70 border-b border-9f70bc' || ""}
                        >
                            <TbColorPicker />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().setColor("#ffffff").run()}
                            className={editor.isActive('textStyle', { color: '#ffffff' }) ? 'is-active text-ffffff border-b border-ffffff' : 'text-ffffff/70 border-b border-ffffff/70 || ""'}
                        >
                            <TbColorPicker />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                            }
                        >
                            <CgUndo />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={
                            
                            !editor.can()
                                .chain()
                                .focus()
                                .redo()
                                .run()
                            }
                        >
                            <CgRedo />
                        </button>

                    </div>

                    <div className="mt-[2rem]">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {editPost ? (
                    <button 
                        className={`text-sm bg-282a36 border border-2f334a  w-fit m-auto px-2 py-1 rounded-lg 
                            ${!formTitle || !formTopic || formContent === "<br/>" ? "" : "hover:bg-2f334a hover:border-5e4fb3/40 transform active:scale-75 transition-transform" || ""}
                        `}
                        disabled={!formTitle || !formTopic || formContent === "<br/>"}
                        onClick={() => updatePost({ 
                            id: updatedPostId,
                            title: formTitle,
                            topic: formTopic,
                            content: formContent,
                            link: formLink,
                        })}
                    >
                        Update
                    </button>
                ) : (
                    <button 
                        className={`text-sm bg-282a36 border border-2f334a  w-fit m-auto px-2 py-1 rounded-lg 
                            ${!formTitle || !formTopic || formContent === "<br/>" ? "" : "hover:bg-2f334a hover:border-5e4fb3/40 transform active:scale-75 transition" || ""}
                        `}
                        disabled={!formTitle || !formTopic || formContent === "<br/>"}
                        onClick={() => createPost({ 
                            title: formTitle,
                            topic: formTopic,
                            content: formContent,
                            link: formLink,
                        })}
                    >
                        Submit
                    </button>
                )}
            </div>
        </>

    );
};

const Post = ({ 
    id,
    authorId,
    authorFirstName,
    authorLastName,
    authorProfileImageUrl,
    updatedAuthorFirstName,
    updatedAuthorLastName,
    createdAt,
    title,
    content,
    topic,
    link,
    editor,
    setFormTitle,
    setFormLink,
    setFormTopic,
    setEditPost,
    setUpdatedPostId,
    topics,
    setTopics,
    setTogglePostWizard,
    setTogglePostWizardDropdown,
}: PostProps) => {
    const ctx = api.useContext();

    const { mutate: deletePost, isLoading: isDeleting } = api.posts.delete.useMutation({
        onSuccess: () => {
            void ctx.posts.getLatest.invalidate();
            void ctx.posts.getAll.invalidate();
            void ctx.posts.getUserPosts.invalidate();
        }
    });

    const user = useUser();

    function handleEditPost() {
        editor?.commands.setContent(content);
        setFormTitle(title);
        setFormLink(link);
        setFormTopic(topic);
        setEditPost(true);
        setUpdatedPostId(id);
        Object.keys(topics).forEach((i) => topics[i] = false);
        setTopics((prev) => {    
            return {...prev, [topic]: true};
        });
        setTogglePostWizard(true);
        setTogglePostWizardDropdown(true);
    }

    return (
        <div 
            key={id}
            className="flex flex-col space-y-4 text-sm bg-20222e font-light space-x-2 transform transition duration-1000 shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-6 rounded-2xl w-full"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Image 
                        src={authorProfileImageUrl || ""} 
                        className="rounded-full"
                        width={30}
                        height={30}
                        alt=""
                    />

                    <div className="flex items-center text-xs">
                        <p className="font-medium">{authorFirstName} {authorLastName}</p>

                        <span className="border border-ffffff/70 mr-1 bg-ffffff/70 rounded-full h-1 w-1 ml-1">{" "}</span> 

                        <p className="text-ffffff/70">{dayjs(createdAt).fromNow()}</p>
                    
                    </div>
                </div>

                {isDeleting && (
                    <div className="flex space-x-0.5 bg-282a36 px-2 rounded-lg shadow-lg">
                        <HelpcatErrorAnimation>
                            <Image 
                                className='m-auto rounded-full p-1'
                                src={sadcat} 
                                width={20}
                                height={20}
                                alt=""
                            />
                        </HelpcatErrorAnimation>
        
                        <div className='text-center font-light flex flex-col text-ffffff/70'>
                            <p className="text-xs m-auto">Deleting post..</p>
                        </div>

                        <HelpcatErrorAnimation>
                            <Image 
                                className='m-auto rounded-full p-1'
                                src={sadcat} 
                                width={20}
                                height={20}
                                alt=""
                            />
                        </HelpcatErrorAnimation>
                    </div>
                )}

                <div className="flex space-x-2">
                    <MdEdit 
                        className="bg-2f334a p-1 text-2xl rounded-full hover:text-5e4fb3/90 cursor-pointer transform active:scale-75 transition-transform" 
                        onClick={handleEditPost}
                    />
                    
                    {authorId === user.user?.id && (
                        <CgClose 
                            className="bg-2f334a p-1 text-2xl rounded-full hover:text-b32d2d/90 cursor-pointer transform active:scale-75 transition-transform" 
                            onClick={() => deletePost({
                                id: id
                            })}
                        />
                    )}
                </div>
            </div>

            <div className="p-6 cursor-pointer hover:bg-3a3d52/30 rounded-lg group">
                <h2 className="text-base font-normal group-hover:text-edc2d8ff mb-2 flex text-center justify-center items-center m-auto">
                    {title}
                </h2>

                <div className='flex justify-start items-start group-hover:text-edc2d8ff'>
                    <FaQuoteLeft />
                </div>

                <div className='px-6 text-wrap cursor-text'>
                    {parse(content)}
                </div>

                <div className='flex justify-end items-end pl-2 group-hover:text-edc2d8ff'>
                    <FaQuoteRight />
                </div>
            </div>

            <p 
                className={`text-xs font-normal rounded-lg
                    ${topic === "SQL" && "text-5e4fb3" || ""}
                    ${topic === "Integrations" && "text-cfca3c" || ""}
                    ${topic === "POS" && "text-cf7b3c" || ""}
                    ${topic === "BOH" && "text-ac4fb3" || ""}
                    ${topic === "Polygon Central" && "text-4ca662" || ""}
                    ${topic === "Firebird" && "text-b32d2d" || ""}
                    ${topic === "APIs" && "text-2da3b3" || ""}
                    ${topic === "Network" && "text-3741bf" || ""}
                    ${topic === "KMS" && "text-9f70bc" || ""}
                    ${topic === "Other" && "text-6caba0" || ""}
                `}
            >
                <span className="border mr-1 rounded-full h-1.5 w-1.5">{" "}</span>
                
                {topic}
            </p>

            {link && (
                <p className="text-xs italic overflow-clip">
                    - Read more @
                    <a 
                        className="hover:text-ffffff/70" 
                        href={link}
                        target="_blank"
                    >
                        {link}
                    </a>
                </p>
            )}

            {updatedAuthorFirstName && updatedAuthorLastName && (
                <p className="text-xs italic overflow-clip">
                    - Last updated by <span className="font-medium">{updatedAuthorFirstName} {updatedAuthorLastName}</span>.
                </p>
            )}
        </div>
    );
};

const Feed = () => {
    const { data: latestPosts } = api.posts.getLatest.useQuery();

    const { data: allPosts } = api.posts.getAll.useQuery();

    const { data: userPosts } = api.posts.getUserPosts.useQuery();

    const user = useUser();

    let userEmail = "";

    if (user.user?.primaryEmailAddress) {
        userEmail = user.user.primaryEmailAddress.toString();
    }

    const [search, setSearch] = useState("");

    const postsFilteredByTitle = allPosts?.filter((post) =>
        post.post.title.toLowerCase().includes(search.toLowerCase())
    );

    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        if(counter < 1) {
            setCounter(1);
        }
    }, 2000);

    const [togglePostWizard, setTogglePostWizard] = useState(false);
    const [togglePostWizardDropdown, setTogglePostWizardDropdown] = useState(false);

    const [formTitle, setFormTitle] = useState("");
    const [formLink, setFormLink] = useState("");
    const [formTopic, setFormTopic] = useState("");

    const [editPost, setEditPost] = useState(false);
    const [updatedPostId, setUpdatedPostId] = useState(0);

    const topicsObject: {[key: string]: boolean} = {
        "SQL": false,
        "POS": false,
        "BOH": false,
        "Polygon Central": false,
        "Integrations": false,
        "Firebird": false,
        "APIs": false,
        "Network": false,
        "KMS": false,
        "Other": false
    };

    const topicsList = Object.keys(topicsObject);

    const [topics, setTopics] = useState(topicsObject);

    function handlePostWizardToggle() {
        setTogglePostWizard(!togglePostWizard);

        setTimeout(() => {
            setTogglePostWizardDropdown(!togglePostWizardDropdown);
        }, 500);
    }

    const editor = useEditor({
        extensions: [
            Underline, 
            StarterKit, 
            Placeholder.configure({
                placeholder: "Share your thoughts..",
            }),
            Color.configure({
                types: ["textStyle"]
            }),
            TextStyle
        ],
        editorProps: {
            attributes: {
                class: "ProseMirror focus:outline-none font-light text-sm rounded-lg"
            },
        },
    });

     if (!latestPosts || !allPosts || !userPosts || !postsFilteredByTitle) return <HelpcatPageLoader />

    return (
        <>
            <Header 
                togglePostWizard={togglePostWizard}
                handlePostWizardToggle={handlePostWizardToggle}
            />

            {userVerification(userEmail, "feed") ? (
                <div className="relative min-h-screen">
                    <div className="p-6">
                        <input 
                            type="text" 
                            className="placeholder-ffffff/60 h-fit w-[40rem] outline-none bg-20222e p-5 text-xs font-light rounded-lg shadow-md"
                            placeholder="Search Helpcat" 
                            spellCheck="true" 
                            onChange={((e) => setSearch(e.target.value))}
                            value={search}
                        />
                    </div>

                    <div className="absolute z-10 top-10 right-0 p-6">
                        <CreatePostWizard 
                            togglePostWizard={togglePostWizard}
                            togglePostWizardDropdown={togglePostWizardDropdown}
                            handlePostWizardToggle={handlePostWizardToggle}
                            editor={editor}
                            formTitle={formTitle}
                            setFormTitle={setFormTitle}
                            formLink={formLink}
                            setFormLink={setFormLink}
                            formTopic={formTopic}
                            setFormTopic={setFormTopic}
                            editPost={editPost}
                            setEditPost={setEditPost}
                            updatedPostId={updatedPostId}
                            topicsList={topicsList}
                            topics={topics}
                            setTopics={setTopics}
                        />
                    </div>

                    <div className="flex relative justify-between p-8">
                        {search !== "" && (
                            <div className="flex-1 flex flex-col items-center justify-start p-6 space-y-4">
                                <h1 className="text-[2rem] text-282a36 border-b w-full">{postsFilteredByTitle.length} Search {postsFilteredByTitle.length === 1 ? "Result" : "" || "Results"} Search Results</h1>

                                {postsFilteredByTitle.map(({ post, author, updatedAuthor }) => (
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        authorId={author?.id || ""}
                                        authorProfileImageUrl={author?.profileImageUrl || ""}
                                        authorFirstName={author?.firstName || ""}
                                        authorLastName={author?.lastName || ""}
                                        updatedAuthorLastName={updatedAuthor?.lastName || ""}
                                        updatedAuthorFirstName={updatedAuthor?.firstName || ""}
                                        createdAt={post.createdAt}
                                        content={post.content}
                                        link={post.link}
                                        title={post.title}
                                        topic={post.topic}
                                        editor={editor}
                                        setFormTitle={setFormTitle}
                                        setFormLink={setFormLink}
                                        setFormTopic={setFormTopic}
                                        setEditPost={setEditPost}
                                        setUpdatedPostId={setUpdatedPostId}
                                        setTopics={setTopics}
                                        setTogglePostWizard={setTogglePostWizard}
                                        setTogglePostWizardDropdown={setTogglePostWizardDropdown}
                                        topics={topics}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex-1 flex flex-col items-center justify-start p-6 space-y-4">
                            <h1 className="text-[2rem] text-282a36 border-b w-full">Latest Posts</h1>

                            {latestPosts.map(({ post, author, updatedAuthor }) => (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    authorId={author?.id || ""}
                                    authorProfileImageUrl={author?.profileImageUrl || ""}
                                    authorFirstName={author?.firstName || ""}
                                    authorLastName={author?.lastName || ""}
                                    updatedAuthorLastName={updatedAuthor?.lastName || ""}
                                    updatedAuthorFirstName={updatedAuthor?.firstName || ""}
                                    createdAt={post.createdAt}
                                    content={post.content}
                                    link={post.link}
                                    title={post.title}
                                    topic={post.topic}
                                    editor={editor}
                                    setFormTitle={setFormTitle}
                                    setFormLink={setFormLink}
                                    setFormTopic={setFormTopic}
                                    setEditPost={setEditPost}
                                    setUpdatedPostId={setUpdatedPostId}
                                    setTopics={setTopics}
                                    setTogglePostWizard={setTogglePostWizard}
                                    setTogglePostWizardDropdown={setTogglePostWizardDropdown}
                                    topics={topics}
                                />
                            ))}
                        </div>

                        {userPosts.length === 0 && (
                            <div className='2xl:flex hidden flex-col p-6 space-y-4 items-center justify-start'>
                                <h1 className="text-[2rem] text-282a36 border-b w-full">My Posts</h1>

                                <div className="flex flex-col p-6 space-y-8 rounded-2xl bg-20222e shadow-[0_3px_10px_rgb(0,0,0,0.5)]">
                                    <HelpcatErrorAnimation>
                                        <Image 
                                            className='m-auto rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.5)]'
                                            src={sadcat} 
                                            width={200}
                                            height={200}
                                            alt=""
                                        />
                                    </HelpcatErrorAnimation>
                    
                                    <div className='text-center font-light flex flex-col text-ffffff/70 space-y-2 bg-282a36 p-2 rounded-lg shadow-lg'>
                                        <p className="text-xs m-auto">No posts found :&#40;</p>

                                        <p className=' text-xs flex items-center justify-center text-redError/70'>
                                            Don&apos;t be an old mate and sleep on the job, create some posts!
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        )}

                        {userPosts.length > 0 && (
                            <div className="flex-1 2xl:flex hidden flex-col items-center justify-start p-6 space-y-4">
                                <h1 className="text-[2rem] text-282a36 border-b w-full">My Posts</h1>

                                {userPosts.map(({ post, author, updatedAuthor }) => (
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        authorId={author?.id || ""}
                                        authorProfileImageUrl={author?.profileImageUrl || ""}
                                        authorFirstName={author?.firstName || ""}
                                        authorLastName={author?.lastName || ""}
                                        updatedAuthorLastName={updatedAuthor?.lastName || ""}
                                        updatedAuthorFirstName={updatedAuthor?.firstName || ""}
                                        createdAt={post.createdAt}
                                        content={post.content}
                                        link={post.link}
                                        title={post.title}
                                        topic={post.topic}
                                        editor={editor}
                                        setFormTitle={setFormTitle}
                                        setFormLink={setFormLink}
                                        setFormTopic={setFormTopic}
                                        setEditPost={setEditPost}
                                        setUpdatedPostId={setUpdatedPostId}
                                        setTopics={setTopics}
                                        setTogglePostWizard={setTogglePostWizard}
                                        setTogglePostWizardDropdown={setTogglePostWizardDropdown}
                                        topics={topics}
                                    />
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            ) : (
                <div className="text-center mt-[2rem]">
                    {counter === 1 && (
                        <p className={`transition duration-1000 transform ${counter === 1 && "opacity-100" || "opacity-0" }`}>
                            YOU AREN&apos;T AUTHORIZED TO VIEW THIS PAGE.
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default Feed;

const HelpcatErrorAnimation = styled.div`
    animation: gelatine 0.5s infinite;

    @keyframes gelatine {
        from, to { transform: scale(1, 1); }
        25% { transform: scale(0.9, 1.1); }
        50% { transform: scale(1.1, 0.9); }
        75% { transform: scale(0.95, 1.05); }
    }
`

const HelpcatLoadingAnimation = styled.div`
    animation: bounce2 2s ease infinite;

    @keyframes bounce2 {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-30px);}
        60% {transform: translateY(-15px);}
    }
`

const E = styled.span`
    animation: e 1.5s linear infinite;

    @keyframes e {
        100% {
            color: #9141e6
        }
    }
`

const S = styled.span`
    animation: s 3s linear infinite;

    @keyframes s {
        100% {
            color: #cae3dd
        }
    }
`

const A = styled.span`
    animation: a 2.5s linear infinite;

    @keyframes a {
        100% {
            color: #5382d2
        }
    }
`

const H = styled.span`
    animation: h 3.5s linear infinite;

    @keyframes h {
        100% {
            color: #80eaac
        }
    }
`

const B = styled.span`
    animation: b 2s ease-in-out infinite;

    @keyframes b {
        100% {
            color: #72e6e8
        }
    }
`

const N = styled.span`
    animation: n 1.5s linear infinite;

    @keyframes n {
        100% {
            color: #d588d5
        }
    }
`

const D = styled.span`
    animation: d 1.75s ease-in-out infinite;

    @keyframes d {
        100% {
            color: #af8be9
        }
    }
`