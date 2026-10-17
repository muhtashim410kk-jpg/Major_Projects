import uploadOnCloudinary from '../config/cloudinary.js'
import geminiResponse from '../gemini.js'
import User from '../models/user.model.js'
import moment from 'moment'

  async function getCurrentUser(req,res){

    try {

        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
        
    }catch (error) {
    console.log("CURRENT USER ERROR:", error);

    return res.status(500).json({
        message: "Get current user error",
        error: error.message
    });
}

  }

  export default getCurrentUser 

 export async function updateAssistant(req,res){
                         
      try {
              const {assistantName,imageUrl} = req.body 
              let assistantImage;

        if(req.file){

            assistantImage  = await uploadOnCloudinary(req.file.path)
           
        }else{
            assistantImage = imageUrl
        }

        const user = await User.findByIdAndUpdate(req.userId,{
            assistantName,assistantImage
        },{new:true}).select("-password")

        return res.status(200).json(user)

      } catch (error) {
         
        return res.status(400).json({message:"update assistant error"})

      }


  }

  export async function createNewChat(req, res) {
  try {
    const user = await User.findById(req.userId);

    user.chats.push({
      title: "New Chat",
      messages: []
    });

    await user.save();

    const newChat = user.chats[user.chats.length - 1];

    return res.status(201).json({
      chat: newChat,
      chats: user.chats
    });

  } catch (error) {
    return res.status(500).json({
      message: "Could not create new chat"
    });
  }
}


export async function deleteChat(req, res) {
  try {
    const user = await User.findById(req.userId);

    user.chats.pull(req.params.chatId);
    await user.save();

    return res.json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: "Delete chat error" });
  }
}


  export async function asktoAssitant(req, res) {
  try {
    const { command, chatId } = req.body;

    const user = await User.findById(req.userId);
    const chat = user.chats.id(chatId);

    if (!chat) {
      return res.status(404).json({
        response: "Chat not found. Please start a new chat."
      });
    }

    const result = await geminiResponse(
      command,
      user.assistantName,
      user.name
    );

    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({
        response: "Sorry, I can't understand."
      });
    }

    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;
    let response;

    switch (type) {
      case 'get_date':
        response = `Current date is ${moment().format("YYYY-MM-DD")}`;
        break;

      case 'get_time':
        response = `Current time is ${moment().format("hh:mm:ss A")}`;
        break;

      case 'get_day':
        response = `Today is ${moment().format("dddd")}`;
        break;

      case 'get_month':
        response = `Month is ${moment().format("MMMM")}`;
        break;

      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'general':
      case 'calculator_open':
      case 'facebook_open':
      case 'weather_show':
      case 'instagram_open':
        response = gemResult.response;
        break;

      default:
        return res.status(400).json({
          response: "I didn't understand that command."
        });
    }

    chat.messages.push({
      question: command,
      response: response
    });

    if (chat.messages.length === 1) {
      chat.title = command.slice(0, 30);
    }

    await user.save();

    return res.json({
      type,
      userInput: gemResult.userInput,
      response,
      chats: user.chats
    });

  } catch (error) {
    console.log("ASK ASSISTANT ERROR:", error);

    return res.status(500).json({
      response: "Ask Assistant Error"
    });
  }
}
  
