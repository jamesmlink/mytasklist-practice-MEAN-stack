var express = require("express");
var router = express.Router();

//bring in mongojs
var mongojs = require("mongojs");

//create a database object, login, and include tasks object
var db = mongojs("mongodb://james:james@ds011873.mlab.com:11873/mytasklist_james", ["tasks"]);

//get all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//get a single task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//save tasks
router.post("/task", function(req, res, next){
	var task = req.body;
	if(!task.title ||(task.isDone + "")) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(tasks);
		});
	}
});

//delete tasks
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//update tasks
router.put('/task/:id', function(req, res, next){
	
	var task = req.body;
	var updTask = {};
	
		
	if(task.isDone){
		updTask.isDone = task.isDone;
	}
	
	if(task.title){
		updTask.title = task.title;
	}
	
	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {},  function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});		
	}
});



//export for use elsewhere
module.exports = router;
























