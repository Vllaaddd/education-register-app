import EducationModel from '../models/Education.js'
import axios from "axios"
import Employee from '../models/Employee.js';

export const addOneEducation = async (req, res) => {
  try {
    const doc = await EducationModel.create({
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      employees: req.body.employees.map(employeeId => ({ employee: employeeId })),
      instructor: req.body.instructor,
      date: req.body.date,
      materials: req.body.materials,
    });

    req.body.employees.forEach(async (employeeId) => {
      const res = await axios.get(`http://localhost:5000/employees/${employeeId}`);
      const employee = res.data;

      employee.allEducations.push(doc._id);

      axios.put(`http://localhost:5000/employees/${employeeId}`, employee);
    });

    res.json({ education: doc });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалось додати навчання",
    });
  }
};

export const getAllEducations = async (req, res) => {
  try {
    const educations = await EducationModel.find({}, null, {_id: -1});

    res.json(educations)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалось отримати всі навчання",
    })
  }
}

export const getOneEducation = async (req, res) => {
  try {
    const educationId = req.params.id;

    EducationModel.findById({_id:educationId}).then((doc) => {
      if(!doc) {
        return res.status(404).json({message: 'Навчання не знайдено'})
      }
      res.json(doc)
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалось отримати навчання",
    })
  }
}

export const removeOneEducation = async (req, res) => {
  try {
    const educationId = req.params.id;

    EducationModel.findByIdAndDelete({_id:educationId}).then((doc) => {
      if(!doc) {
        return res.status(404).json({message: 'Навчання не знайдено', error: err})
      }
      res.json(doc)
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалось видалити навчання",
    })
  }
}

export const updateOneEducation = async (req, res) => {
  try {
    const educationId = req.params.updateId;
    const employeeId = req.body.employeeId;
    const isCompleted = req.body.isCompleted;

    const education = await EducationModel.findById(educationId);

    if (!education) {
      return res.status(404).json({ message: 'Навчання не знайдено' });
    }

    const employee = education.employees.find(emp => emp.employee.toString() === employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Працівник не знайдений у цьому навчанні' });
    }

    employee.isCompleted = isCompleted;

    await education.save();

    res.json(education);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалось оновити навчання',
    });
  }
};

export const findSomeEducation = async (req, res) => {
  try {
    const title = req.params.title;
    const formattedTitle = title.toLowerCase();

    EducationModel.find({ title: { $regex: formattedTitle, $options: "i" } })
    .then((docs) => {
        res.json(docs);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Не вдалось знайти навчання",
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалось знайти навчання",
    });
  }
};

export const deleteAllEducations = async (req, res) => {
  try {
    const educations = await EducationModel.deleteMany()
    
    res.json(educations)
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось видалити навчання"
    })
  }
}

export const changeIsCompleted = async (req, res) => {
  try {
    const educationId = req.params.id;
    const education = await EducationModel.findById(educationId);

    if (!education) {
      return res.status(404).json({ message: 'Навчання не знайдено' });
    }

    const employeeId = req.body.employeeId;
    const employee = education.employees.find(emp => emp.employee.toString() === employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Працівник не знайдений у цьому навчанні' });
    }

    employee.isCompleted = req.body.isCompleted;

    await education.save();

    res.json(education);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалось оновити навчання',
    });
  }
};