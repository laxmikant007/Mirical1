const Category = require('../models/category');
const slugify = require('slugify');

exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id)
    .exec((err, cate) => {
        if(err || !cate) return res.status(400).json({ error: "No Category Found!" })
        req.category = cate;
        next();
    })
}

exports.createCategory = (req,res) => {
    Category.findOne({ name: req.body.name })
        .exec((err, cate) => {
            if(err) return res.status(400).json({ error: "Failed To Find Category!" })
            if(cate) return res.status(400).json({ error: "Category Already Exist!" })

            const _category = new Category({
                name: req.body.name,
                slug: slugify(req.body.name)    
            });
            _category.save((err, category) => {
                if(err) return res.status(400).json({ error: "Failed To Save Category!" })
                if(category) return res.status(201).json({ message: "Category Created Succesfully!", category: category})
            })
        })
}

exports.getCategory = (req,res) => {
    return res.json(req.category);
}

exports.getAllCategories = (req,res) => {
    Category.find({})
    .exec((err, categories) => {
        if(err) return res.status(400).json({ error: "Failed To Load Categories!"})
        return res.status(200).json(categories)
    })
}

exports.updateCategory = (req,res) => {
    const cate = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: cate },
        { new: true, useFindAndModify: false },
        (err, updatedCategory) => {
            if(err) return res.status(400).json({ error: "Failed To Update Category!" })
            return res.status(200).json({ message: "Successfully Updated The Category!", updatedCategory })
        }
    )
}

exports.removeCategory = (req,res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err) return res.status(400).json({ error: "Failed To Delete Category!" })
        return res.json({ message: `${category.name} deleted successfully!` })
    })
}