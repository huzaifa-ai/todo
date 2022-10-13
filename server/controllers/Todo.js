const Todo = require('../models/Todo');
const User = require('../models/User');

// ------------CREATING AND UPDATING A TODO
exports.createToDo = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    // TodoArray.push(req.body.task);

    let todo = await Todo.findOne({ PostedBy: user._id });

    if (todo) {
      let UpdatedArray = [...todo.Todo, req.body.task];
      await Todo.findOneAndUpdate(
        { PostedBy: todo.PostedBy },
        { Todo: UpdatedArray, PostedBy: user._id },
        { new: true }
      ).exec();
      console.log('Updated Array', UpdatedArray);
    } else {
      let NewArray = [];
      NewArray.push(req.body.task);
      await new Todo({
        Todo: NewArray,
        PostedBy: user._id,
      }).save();
      console.log('New Todo ');
    }
    res.status(200).json({
      data: 'Todo added successfully',
    });
  } catch (err) {
    console.log(err);
  }
};

//----------------gETTING LIST OF ALL TODOS

exports.getTodo = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const result = await Todo.findOne({ PostedBy: user._id }).exec();
  res.json(result);
};

//----------------Deleting Todo

exports.deleteTodo = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const List = await Todo.findOne({ PostedBy: user._id }).exec();
  const ListArray = List.Todo;
  console.log(ListArray);

  for (i = 0; i < ListArray.length; i++) {
    if (ListArray[i] == req.body.todo) {
      ListArray.splice(i, 1);
      console.log(ListArray);
    }
  }
  await Todo.findOneAndUpdate(
    { PostedBy: user._id },
    { Todo: ListArray, PostedBy: user._id },
    { new: true }
  ).exec();
  res.json({
    data: 'Successfully deleted todo',
  });
};
